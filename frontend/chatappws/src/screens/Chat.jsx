import { Messages } from "./Messages";
import { SendMessage } from "./SendMessage";

export const Chat = (props) =>{
    return (
        <>
        chat
        <Messages />
        <SendMessage username={props.username} roomid={props.roomid} socket={props.socket} />
        </>
    );
}