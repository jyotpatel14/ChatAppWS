import { WebSocket } from "ws";
import { User } from "./User";
import { GETUSERS, SEND, SETROOMID } from "./messages";

export class ChatManager {
    private users: User[];
    constructor() {
        this.users = [];
    }

    addUser(username: String, room: String, socket: WebSocket) {
        if (!this.users.some(user => user.username === username)) {
            const user = new User(username, room, socket);
            this.users.push(user);
            this.addHandler(socket);
            socket.send("User Added");
            console.log(user.username);
        }
        else if (this.users.some(user => user.username === username && user.socket === socket )) {
            this.users.some(user => {
                user.roomId = room;
                socket.send("RoomID Updated");
                
            });
        }
        else if (this.users.some(user => user.username === username && user.socket !== socket )){
            socket.send("Username Change Required");
        }
        
    }
    removeUser(socket: WebSocket) {
        this.users = this.users.filter((user) => user.socket != socket);
        socket.send("UserRemoved");
    }

    private addHandler(socket: WebSocket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            // this.chat.push(message);

            if (message.type === GETUSERS) {
                this.users.forEach((user) => {
                    socket.send(user.username);
                });
            }
            if (message.type === SEND) {
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