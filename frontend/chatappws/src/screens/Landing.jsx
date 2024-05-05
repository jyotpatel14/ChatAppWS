import React, { useState } from "react";
import { Chat } from "./Chat";
const socket = new WebSocket("ws://localhost:8080/");

export const Landing = () => {
    const [username, setUsername] = useState("");
    const [roomid, setRoomId] = useState("");
    
        

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = {
            type: "log_user",
            username: username,
            roomid: roomid
        }
        socket.send(JSON.stringify(message));

        socket.onmessage = (e) =>{
            alert(e.data);
        }
    }

    return (
        <>
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter the room ID"
                    value={roomid}
                    onChange={(e) => setRoomId(e.target.value)}
                />
                <button type="submit">Join Room</button>
            </form>
        </div>
        <div>
            <Chat username={username} roomid={roomid} socket={socket}/>
        </div>
        </>
    )
}