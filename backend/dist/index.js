"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ChatManager_1 = require("./ChatManager");
const messages_1 = require("./messages");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const chatManager = new ChatManager_1.ChatManager();
wss.on('connection', function connection(ws) {
    //   ws.on('error', console.error);
    //   ws.on('message', function message(data) {
    //     console.log('received: %s', data);
    //   });
    ws.send('something');
    ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        if (message.type === messages_1.LOGINUSER) {
            chatManager.addUser(message.username, message.roomId, ws);
        }
    });
    ws.on('close', () => {
        chatManager.removeUser(ws);
    });
});
