import { WebSocketServer } from 'ws';
import { ChatManager } from './ChatManager';
import { LOGINUSER } from './messages';

const wss = new WebSocketServer({ port: 8080 });

const chatManager = new ChatManager();

wss.on('connection', function connection(ws) {
    
//   ws.on('error', console.error);

//   ws.on('message', function message(data) {
//     console.log('received: %s', data);
//   });

    ws.send('something');
    ws.on('message',(data)=>{
        const message = JSON.parse(data.toString());

        if (message.type === LOGINUSER){
            chatManager.addUser(message.username, message.roomId, ws);
        }

    });

    ws.on('close', () => {
        chatManager.removeUser(ws);
    });
});