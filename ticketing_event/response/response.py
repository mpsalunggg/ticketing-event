def success_response(message, data):
    return {
        "error": False,
        "debug_message": "Success",
        "message": message,
        "data": data
    }

def error_response(debug_message, message):
    return {
        "error": True,
        "debug_message": debug_message,
        "message": message,
        "data": None
    }