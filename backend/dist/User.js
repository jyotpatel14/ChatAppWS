"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(user, roomId, socket) {
        this.username = user,
            //this.password = pass
            this.roomId = roomId;
        this.socket = socket;
    }
    setRoomId(id) {
        this.roomId = id;
    }
    getRoomId() {
        return this.roomId;
    }
}
exports.User = User;
