"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatManager = void 0;
const User_1 = require("./User");
const messages_1 = require("./messages");
class ChatManager {
    constructor() {
        this.users = [];
    }
    addUser(username, room, socket) {
        if (!this.users.some(user => user.username === username)) {
            const user = new User_1.User(username, room, socket);
            this.users.push(user);
            this.addHandler(socket);
            socket.send("User Added");
            console.log(user.username);
        }
        else if (this.users.some(user => user.username === username && user.socket === socket)) {
            this.users.some(user => {
                user.roomId = room;
                socket.send("RoomID Updated");
            });
        }
        else if (this.users.some(user => user.username === username && user.socket !== socket)) {
            socket.send("Username Change Required");
        }
    }
    removeUser(socket) {
        this.users = this.users.filter((user) => user.socket != socket);
        socket.send("UserRemoved");
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            // this.chat.push(message);
            if (message.type === messages_1.GETUSERS) {
                this.users.forEach((user) => {
                    socket.send(user.username);
                });
            }
            if (message.type === messages_1.SEND) {
                this.users.forEach((user) => {
                    if (user.socket !== socket && message.roomId === user.roomId) {
                        user.socket.send(JSON.stringify(message));
                        console.log(JSON.stringify(message));
                    }
                });
            }
        });
    }
}
exports.ChatManager = ChatManager;
