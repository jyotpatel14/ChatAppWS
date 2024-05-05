import { useState } from "react";

export const SendMessage = (props) => {

    const [message,setMessage] = useState('');

    const handleSend = (e) => {
        e.preventDefault();

        const messageObj = {
            type: "send_message",
            username: props.username,
            roomid: props.roomid,
            messageText: message
        }
        props.socket.send(JSON.stringify(messageObj));
        setMessage('');

        props.socket.onmessage = (e) =>{
            alert(e.data);
        }
    }

    return (
        <>
            <div>
                <form onSubmit={handleSend}>
                    <input
                        type="text"
                        placeholder="Enter your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </>
    );
}