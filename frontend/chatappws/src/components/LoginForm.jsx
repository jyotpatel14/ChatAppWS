import React, { useState } from 'react'

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [roomid, setRoomId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = {
            type: "log_user",
            username: username,
            roomid: roomid
        }
        WebSocket.send(JSON.stringify(message));
    }

    return (
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
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                />
                <button type="submit">Join Room</button>
            </form>
        </div>
    )
}
