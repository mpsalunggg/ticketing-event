// Copyright (c) 2025, fe and contributors
// For license information, please see license.txt

frappe.ui.form.on('Event Transaction', {
  refresh: function (frm) {
    // Hide the Save button
    frm.disable_save()

    if (frm.doc.status === 'Booked') {
      frm.add_custom_button(__('Mark as Paid'), function () {
        frm.set_value('status', 'Paid')
        frm.save()
      })
      AddButtonBooked(frm)
    }

    frappe.db
      .get_value('Event Transaction', frm.doc.name, ['status'])
      .then((r) => {
        if (r.message.status === 'Booked') {
          frm.set_df_property('quantity', 'read_only', 1)
          frm.set_df_property('event', 'read_only', 1)
          frm.remove_custom_button('Booked')
          AddButtonCancelled(frm)
        }
        if (r.message.status === 'Paid') {
          frm.set_df_property('quantity', 'read_only', 1)
          frm.set_df_property('event', 'read_only', 1)
          frm.remove_custom_button('Cancel')
        }
        if (r.message.status === 'Cancelled') {
          frm.set_df_property('quantity', 'read_only', 0)
          frm.set_df_property('event', 'read_only', 0)
          frm.set_df_property('status', 'read_only', 1)
          AddButtonBooked(frm)
        }
      })
  },

  // // When a new transaction is created
  // validate: function (frm) {
  //   if (frm.doc.__islocal) {
  //     // Set initial status to 'Booked' for new transactions
  //     frm.set_value('status', 'Booked')

  //     // Don't call updateEventTickets here - it will be handled in after_save
  //     // This avoids duplicate ticket reductions
  //   }
  // },

  // After saving - handle status changes
  after_save: function (frm) {
    if (frm.doc.status === 'Booked') {
      updateEventTickets(frm)
    }

    // if (frm.doc.status === 'Paid') {
    //   updateEventTickets(frm)
    // }

    if (frm.doc.status === 'Paid' && frm._previous_status === 'Booked') {
      showPaymentSuccessMessage(frm)
    }

    // If transaction was cancelled, restore tickets
    if (frm.doc.status === 'Cancelled') {
      restoreEventTickets(frm)
    }
  },

  before_save: function (frm) {
    if (frm.doc.event && frm.doc.quantity) {
      return Promise.all([
        frappe.db.get_value('Event Activity', frm.doc.event, [
          'total_ticket',
          'available',
        ]),
        frappe.db.get_value('Event Transaction', frm.doc.name, ['status']),
      ]).then(([eventData, transactionData]) => {
        if (eventData.message) {
          const totalTicket = eventData.message.total_ticket
          const isAvailable = eventData.message.available

          // Get current status from the database if this is an existing transaction
          let currentStatus = ''
          if (transactionData && transactionData.message) {
            currentStatus = transactionData.message.status
          } else {
            // For new transactions
            currentStatus = 'Booked'
          }

          // Remove any read-only property for quantity and event when in Booked status
          if (frm.doc.status === 'Booked') {
            frm.set_df_property('quantity', 'read_only', 0)
            frm.set_df_property('event', 'read_only', 0)
          }

          if (!isAvailable && totalTicket < transactionData.message.quantity) {
            frappe.throw('Event ini tidak tersedia!')
          }

          // Check ticket availability only for new bookings or status changes to Booked
          // For existing transactions, we should not check again
          if (
            frm.doc.__islocal ||
            (frm.doc.status === 'Booked' && frm._previous_status !== 'Booked')
          ) {
            if (totalTicket < frm.doc.quantity) {
              frappe.throw('Tiket habis! Tidak dapat melanjutkan transaksi.')
            }
          }
        }
      })
    }
  },

  onload: function (frm) {
    // Store original status for comparison
    frm._previous_status = frm.doc.status

    if (frm.doc.__islocal) {
      // Get current user's information
      frappe.db
        .get_value('User', frappe.session.user, ['full_name'])
        .then((r) => {
          if (r.message && r.message.full_name) {
            frm.set_value('customer', r.message.full_name)
          } else {
            // If full name is not available, use the user ID
            frm.set_value('customer', frappe.session.user)
          }
        })

      // Set default status for new transactions
      frm.set_value('status', 'Booked')
    }
  },

  event: function (frm) {
    calculateAmount(frm)
  },

  quantity: function (frm) {
    calculateAmount(frm)
  },
})

// Function to show payment success message
function showPaymentSuccessMessage(frm) {
  frappe.db.get_value('Event Activity', frm.doc.event, ['title']).then((r) => {
    if (r.message) {
      const eventTitle = r.message.title

      frappe.show_alert(
        {
          message: `
            <div>
              <strong>Selamat!</strong> Anda telah membayar ${format_currency(
                frm.doc.amount
              )}.
              <p style="margin-bottom: 0;">Enjoy menikmati event ${eventTitle}. Terima kasih atas pembelian Anda.</p>
            </div>
          `,
          indicator: 'green',
        },
        10
      ) // Show for 10 seconds
    }
  })
}

function calculateAmount(frm) {
  if (frm.doc.event && frm.doc.quantity) {
    frappe.db.get_value('Event Activity', frm.doc.event, 'price').then((r) => {
      if (r.message && r.message.price) {
        // Calculate and set the amount
        const amount = r.message.price * frm.doc.quantity
        frm.set_value('amount', amount)
      }
    })
  }
}

// Function to update event tickets when a transaction is booked
function updateEventTickets(frm, status) {
  if (frm.doc.event && frm.doc.quantity) {
    // Get current total_ticket value from Event Activity
    frappe.db
      .get_value('Event Activity', frm.doc.event, ['total_ticket', 'available'])
      .then((r) => {
        if (r.message) {
          const isAvailable = r.message.available
          const currentTotal = r.message.total_ticket

          // Ensure we're working with numbers
          const quantity = parseInt(frm.doc.quantity, 10)
          const ticketCount = parseInt(currentTotal, 10)

          // Make sure we don't go below zero
          const newTotal = Math.max(0, ticketCount - quantity)

          if (quantity <= ticketCount) {
            // Update the total_ticket in Event Activity only if the event is available
            if (Boolean(isAvailable)) {
              frappe.db
                .set_value(
                  'Event Activity',
                  frm.doc.event,
                  'total_ticket',
                  newTotal
                )
                .then(() => {
                  // Show message about tickets being reduced
                  frappe.show_alert(
                    `Reduced ${quantity} tickets from event. Remaining: ${newTotal}`,
                    5
                  )

                  // If no tickets left, mark event as unavailable
                  if (newTotal === 0) {
                    frappe.db.set_value(
                      'Event Activity',
                      frm.doc.event,
                      'available',
                      0
                    )
                  }
                })
            }
          }
        }
      })
  }
}

// Function to restore tickets when a transaction is cancelled
function restoreEventTickets(frm) {
  if (frm.doc.event && frm.doc.quantity) {
    // Get current total_ticket value
    frappe.db
      .get_value('Event Activity', frm.doc.event, ['total_ticket'])
      .then((r) => {
        if (r.message) {
          // Ensure we're working with numbers
          const currentTotal = parseInt(r.message.total_ticket, 10)
          const quantity = parseInt(frm.doc.quantity, 10)

          const newTotal = currentTotal + quantity

          // Restore the tickets
          frappe.db
            .set_value(
              'Event Activity',
              frm.doc.event,
              'total_ticket',
              newTotal
            )
            .then(() => {
              // Show message about tickets being restored
              frappe.show_alert(
                `Restored ${quantity} tickets to event. New total: ${newTotal}`,
                5
              )

              // Ensure event is marked as available
              frappe.db.set_value(
                'Event Activity',
                frm.doc.event,
                'available',
                1
              )
            })
        }
      })
  }
}

function AddButtonPaid(frm) {
  frm.add_custom_button(__('Mark as Paid'), function () {
    frm.set_value('status', 'Paid')
    frm.save()
  })
}

function AddButtonBooked(frm) {
  frm
    .add_custom_button(__('Booked'), function () {
      frm.set_value('status', 'Booked')
      frm.save()
    })
    .addClass('btn-primary')
}

function AddButtonCancelled(frm) {
  frm
    .add_custom_button(__('Cancel'), function () {
      frappe.confirm(
        'Are you sure you want to cancel this transaction? Cancelled transactions cannot be reactivated.',
        () => {
          frm.set_value('status', 'Cancelled')
          frm.save()
        }
      )
    })
    .addClass('btn-danger')
}
