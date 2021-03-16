from flask import session, request
from . import usersList
from flask_socketio import emit
from .. import socketio


@socketio.on("connect", namespace="/home")
def handle_connect():
    """
    search for current user in userslist and change his stats from active:False to True
    and send broadcast with userList
    """
    emit("active_user", "name", broadcast=True)


@socketio.on("active_user", namespace="/home")
def handle_active_user(data):
    """
    search for user and active it
    """
    print("user data ", data, "usersList", usersList)
    userId = data["userId"]
    current_user = search(userId)
    if (current_user):
        current_user["active"] = True
        current_user["sid"] = request.sid
        emit("active_user", {"usersList": usersList}, broadcast=True)


@socketio.on("new_message", namespace="/home")
def handle_recive_message(message):
    print("message", message)
    if message:
        to = message.get("to")
        print("to object ", to)
        emit("message", message, room=to["sid"])


# utilites
def search(userId):
    """ search for current user by user id in users List   """
    user = next(
        (u for u in usersList if u["userId"] == userId), None)
    return user


@socketio.on("disconnect")
def handle_disconnect(data):
    """
    search for user and change his state to un active and broadcast usersList
    """
    userId = data["userId"]
    current_user = search(userId)
    current_user["active"] = False
    emit("active_user", {"usersList", usersList}, broadcast=True)


# userId = data["userId"]
# current_user = search()  # search by the id in the session
# current_user["active"] = True
# current_user["sid"] = request.sid
# session["name"] = "newname"
# print("userlist", usersList, "session", session)