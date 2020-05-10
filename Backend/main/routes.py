from flask import request, session
# from flask_socketio import emit
from . import main, usersList


@main.route("/login", methods=["POST", "GET"])
def handle_login():
    user = request.get_json().get("user")
    userName = user.get("userName")
    userId = user.get("userId")
    if userName is not None and userId is not None:
        usersList.append(
            {"userName": userName, "userId": userId, "sid": "", "active": False, "messages": []})
        return {"usersList": usersList}
    else:
        return {"error": "user not valid"}
