import io from "socket.io-client";
var socket;

export function setSocket() {
  socket = io("http://127.0.0.1:5000/home");
}

export function listenToMessage(callBack) {
  socket.on("message", callBack);
}

export function listenToActiveUser(callBack) {
  socket.on("active_user", callBack);
}

export function activateUser(message, callBack) {
  socket.emit("active_user", message);
}

export function sendMessage(message, callBack) {
  socket.emit("new_message", message, callBack);
}
