from flask import session, request
from . import socketio, usersList
from flask_socketio import emit


@socketio.on("connect")
def handle_connect():
    """
    search for current user in userslist and change his stats from active:False to True 
    and send broadcast with userList   
    """
    current_user = search()  # search by the id in the session
    current_user["active"] = True
    current_user["sid"] = request.sid
    emit("usersList", {"usersList", usersList}, broadcast=True)


@socketio.on("message")
def handle_recive_message(data):
    message = data.get("message")
    if message:
        to = message.get("to")
        # send message to specific user by using sid as room name
        socketio.emit("message", {"message": message}, room=to.sid)


@socketio.on("disconnect")
def handle_disconnect(user):
    """
    search for user and change his state to un active and broadcast usersList
    """
    current_user = search()
    current_user["active"] = False
    emit("usersList", {"usersList", usersList}, broadcast=True)


# utilites

def search():
    """ search for current user by user id in users List"""
    return next((u for u in usersList if u["userId"] == session.get("userId")), None)
