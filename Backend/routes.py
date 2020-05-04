from flask import request, session
from flask_socketio import emit
from . import app, socketio, usersList


@app.route("/login", methods=["POST"])
def handle_login():
    user = request.get_json().get("user")
    userName = user.get("userName")
    userId = user.get("userId")
    if userName is not None and userId is not None:
        session["userName"] = userName
        session["userId"] = userId
        usersList.append(
            {"userName": userName, "userId": userId, "sid": "", "active": False})
        return {"usersList": usersList}
    else:
        return {"error": "user not valid"}
