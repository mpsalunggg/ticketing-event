from urllib.parse import urlparse

import frappe
import frappe.utils
from frappe import _
from frappe.apps import get_default_path
# from frappe.rate_limiter import rate_limit
from frappe.utils.oauth import get_oauth2_authorize_url, get_oauth_keys
from frappe.utils.password import get_decrypted_password
from frappe.utils.html_utils import get_icon_html
from frappe.utils.data import escape_html
from frappe.website.utils import get_home_page

from ticketing_event.response.response import success_response
from ticketing_event.response.response import error_response

@frappe.whitelist(allow_guest=True)

def get_social():
    try:
        provider_logins = []
        redirect_to = frappe.local.request.args.get("redirect-to")
        redirect_to = sanitize_redirect(redirect_to)
        redirect_to = redirect_to

        providers = frappe.get_all(
            "Social Login Key",
            filters={"enable_social_login": 1},
            fields=["name", "client_id", "base_url", "provider_name", "icon"],
            order_by="name",
        )

        for provider in providers:
            client_secret = get_decrypted_password("Social Login Key", provider.name, "client_secret")
            if not client_secret:
                 continue
            
            icon = None
            if provider.icon:
                if provider.provider_name == "Custom":
                    icon = get_icon_html(provider.icon, small=True)
                else:
                    icon = f"<img src={escape_html(provider.icon)!r} alt={escape_html(provider.provider_name)!r}>"

            if provider.client_id and provider.base_url and get_oauth_keys(provider.name):
                 provider_logins.append(
                    {
                        "name": provider.name,
                        "provider_name": provider.provider_name,
                        "auth_url": get_oauth2_authorize_url(provider.name, redirect_to),
                        "icon": icon,
                    }
                )   

        frappe.response['http_status_code'] = 200
        frappe.response.update(success_response('berhasil mengambil data social', provider_logins))
        print(f"[DEBUG] provider_logins: {provider_logins}")

    except Exception as e:
        frappe.response['http_status_code'] = 500
        frappe.response.update(error_response(str(e), "terjadi kesalahan saat mengambil data social"))

def sanitize_redirect(redirect: str | None) -> str | None:
	if not redirect:
		return redirect

	parsed_redirect = urlparse(redirect)
	if not parsed_redirect.netloc:
		return redirect

	parsed_request_host = urlparse(frappe.local.request.url)
	if parsed_request_host.netloc == parsed_redirect.netloc:
		return redirect

	return None


# @frappe.whitelist(allow_guest=True)
# @rate_limit(limit=5, seconds=60 * 60)
# def with_sso(social_id):
#     try:

#         provider = frappe.get_doc("Social Login Key", social_id)
        
#         client_secret = get_decrypted_password("Social Login Key", provider.name, "client_secret")

#         payload = {
#             "name": provider.name,
#             "provider_name": provider.provider_name,
#             "auth_url": get_oauth2_authorize_url(provider.name, provider.redirect_url)
#         }

#         frappe.response['http_status_code'] = 200
#         frappe.response.update(success_response('berhasil mengambil data social', provider))
#     except Exception as e:
#         frappe.response['http_status_code'] = 500
#         frappe.response.update(error_response(str(e), "terjadi kesalahan saat mengambil data social"))