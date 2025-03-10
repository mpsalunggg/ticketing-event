# Copyright (c) 2025, fe and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class EventTransaction(Document):
    def before_save(self):
        if self.event and self.quantity:
            event_data = frappe.db.get_value("Event Activity", self.event, ["total_ticket", "available"], as_dict=True)
            
            if not event_data:
                frappe.throw("Event tidak ditemukan!")
            
            total_ticket = event_data.total_ticket
            is_available = event_data.available
            
            if self.status == "Booked" and self.is_new():
                if total_ticket < self.quantity:
                    frappe.throw("Tiket habis! Tidak dapat melanjutkan transaksi.")
            
            if self.status == "Booked":
                self.set_read_only_fields(False)
            elif self.status == "Paid":
                self.set_read_only_fields(True, exclude_status=True)
            elif self.status == "Cancelled":
                self.set_read_only_fields(True, allow_edit_quantity=True)
    
    def after_save(self):
        if self.status == "Booked":
            self.update_event_tickets(reduce=True)
        elif self.status == "Paid" and self.get_doc_before_save().status == "Booked":
            self.show_payment_success_message()
        elif self.status == "Cancelled":
            self.update_event_tickets(reduce=False)
    
    def update_event_tickets(self, reduce=True):
        if self.event and self.quantity:
            event_data = frappe.db.get_value("Event Activity", self.event, ["total_ticket", "available"], as_dict=True)
            
            if event_data:
                total_ticket = event_data.total_ticket
                quantity = self.quantity
                
                new_total = max(0, total_ticket - quantity) if reduce else total_ticket + quantity
                frappe.db.set_value("Event Activity", self.event, "total_ticket", new_total)
                
                if reduce and new_total == 0:
                    frappe.db.set_value("Event Activity", self.event, "available", 0)
                elif not reduce:
                    frappe.db.set_value("Event Activity", self.event, "available", 1)
    
    def show_payment_success_message(self):
        event_title = frappe.db.get_value("Event Activity", self.event, "title")
        if event_title:
            frappe.msgprint(f"Selamat! Anda telah membayar {self.amount}. Enjoy event {event_title}. Terima kasih atas pembelian Anda.", indicator="green")
    
    def set_read_only_fields(self, read_only, exclude_status=False, allow_edit_quantity=False):
        self.flags.ignore_validate_update_after_submit = True
        frappe.db.set_value(self.doctype, self.name, "quantity", self.quantity if allow_edit_quantity else 0, update_modified=False)
        frappe.db.set_value(self.doctype, self.name, "event", self.event, update_modified=False)
        if not exclude_status:
            frappe.db.set_value(self.doctype, self.name, "status", self.status, update_modified=False)

@frappe.whitelist()
def create_transaction(event, quantity):
    doc = frappe.get_doc({
        "doctype": "Event Transaction",
        "event": event,
        "quantity": quantity,
        "status": "Booked"
    })
    doc.insert()
    return doc

@frappe.whitelist()
def update_transaction_status(transaction_id, status):
    doc = frappe.get_doc("Event Transaction", transaction_id)
    if not doc:
        frappe.throw("Transaksi tidak ditemukan!")
    
    valid_status = ["Booked", "Paid", "Cancelled"]
    if status not in valid_status:
        frappe.throw("Status tidak valid!")
    
    doc.status = status
    doc.save()
    return doc
