import frappe
from frappe.utils import now

@frappe.whitelist()
def create_transaction(event, quantity):
    try:
        event_doc = frappe.get_doc("Event Activity", event)
        if not event_doc.available or event_doc.total_ticket < quantity:
            return {"message": "Tiket habis! Tidak dapat melanjutkan transaksi.", "indicator": "red"}
        
        transaction = frappe.get_doc({
            "doctype": "Event Transaction",
            "event": event,
            "quantity": quantity,
            "status": "Booked",
            "customer": frappe.session.user,
            "date": now()
        })
        transaction.insert()
        
        event_doc.total_ticket -= quantity
        event_doc.save()
        
        return {"message": "Transaksi berhasil dibuat.", "indicator": "green", "transaction_id": transaction.name}
    except Exception as e:
        return {"message": str(e), "indicator": "red"}

@frappe.whitelist()
def update_transaction_status(transaction_id, status):
    try:
        valid_status = ["Booked", "Paid", "Cancelled"]
        if status not in valid_status:
            return {"message": "Status tidak valid!", "indicator": "red"}
        
        transaction = frappe.get_doc("Event Transaction", transaction_id)
        prev_status = transaction.status
        
        if prev_status == "Paid":
            return {"message": "Transaksi sudah dibayar dan tidak bisa diubah.", "indicator": "red"}
        
        transaction.status = status
        transaction.save()
        
        if status == "Paid" and prev_status == "Booked":
            return {"message": f"Selamat! Anda telah membayar {transaction.amount}. Enjoy event {transaction.event}.", "indicator": "green"}
        
        if status == "Cancelled":
            event_doc = frappe.get_doc("Event Activity", transaction.event)
            event_doc.total_ticket += transaction.quantity
            event_doc.save()
            return {"message": "Transaksi dibatalkan, tiket dikembalikan.", "indicator": "yellow"}
        
        return {"message": "Status transaksi diperbarui.", "indicator": "green"}
    except Exception as e:
        return {"message": str(e), "indicator": "red"}
