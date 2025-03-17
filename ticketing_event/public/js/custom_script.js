frappe.ready(function () {
  frappe.call({
    method: 'ticketing_event.api.check_access',
    callback: function (r) {
      if (r.exc) {
        frappe.msgprint(__('You are not authorized to view this page'))
        window.location.href = '/login'
      }
    },
  })
})
