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
    # userId = data["userId"]
    # current_user = search()  # search by the id in the session
    # current_user["active"] = True
    # current_user["sid"] = request.sid
    # session["name"] = "newname"
    # print("userlist", usersList, "session", session)
    emit("usersList", "name", broadcast=True)


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
        print(usersList)
        emit("usersList", {"usersList": usersList}, broadcast=True)


# @socketio.on("message")
# def handle_recive_message(data):
#     message = data.get("message")
#     if message:
#         to = message.get("to")
#         # send message to specific user by using sid as room name
#         socketio.emit("message", {"message": message}, room=to.sid)


# @socketio.on("disconnect")
# def handle_disconnect(user):
#     """
#     search for user and change his state to un active and broadcast usersList
#     """
#     current_user = search(userId)
#     current_user["active"] = False
#     emit("usersList", {"usersList", usersList}, broadcast=True)


# utilites
def search(userId):
    """ search for current user by user id in users List   """
    user = next(
        (u for u in usersList if u["userId"] == userId), None)
    return user
