import { WebSocket } from "ws";

export class User{
    public username:String;
    //private password: String;
    roomId : String;
    public socket : WebSocket;

    constructor(user:String, roomId:String, socket:WebSocket){
        this.username = user,
        //this.password = pass
        this.roomId = roomId;
        this.socket = socket;
    }
    setRoomId(id:String){
        this.roomId = id;
    }
    getRoomId(){
        return this.roomId;
    }
}