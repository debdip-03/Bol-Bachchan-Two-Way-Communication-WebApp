import styled from "styled-components";
import "../styles/ChatBox.css";
import Logout from "./Logout.jsx";
import ChatInput from "./ChatInput.jsx";
import { getAllMsgRoute, sendMsgRoute } from "../utils/APIRoutes.js";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

const ChatBoxContainer = styled.div``;

export default function ChatBox(props) {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        if (props.currChat) {
            async function getMessages() {
                const data = await axios.post(getAllMsgRoute, {
                    from: props.currUsr._id,
                    to: props.currChat._id
                });
                setMessages(data.data);
            }

            getMessages().then();
        }
    }, [props.currChat]);
    const handleSendMsg = async (msgTxt) => {
        await axios.post(sendMsgRoute, {
            from: props.currUsr._id,
            to: props.currChat._id,
            msgTxt: msgTxt
        });
        props.socket.current.emit("send-msg", {
            from: props.currUsr._id,
            to: props.currChat._id,
            msgTxt: msgTxt
        });
        setMessages((prev) => [...prev, { fromSelf: true, msgTxt: msgTxt }]);
    };
    useEffect(() => {
        if (props.socket.current) {
            props.socket.current.on("msg-receive", (msgTxt) => {
                console.log("Received message:", msgTxt);
                setMessages((prev) => [...prev, { fromSelf: false, msgTxt: msgTxt }]);
            });
        }
        return () => {
            if (props.socket.current) {
                props.socket.current.off("msg-receive");
            }
        };
    }, []);

    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            {props.currChat && (
                <ChatBoxContainer className="chat-box">
                    <div className="chat-header">
                        <div className="user-details">
                            <div className="avatar">
                                <img src={`data:image/svg+xml;base64,${props.currChat.avatarImg}`} alt="chat" />
                            </div>
                            <div className="username">
                                <h3>{props.currChat.usrNam}</h3>
                            </div>
                        </div>
                        <Logout />
                    </div>
                    <div className="chat-messages">
                        {messages.map((msg) => {
                            return (
                                <div ref={scrollRef} key={uuid()}>
                                    <div className={`message ${msg.fromSelf ? "sent" : "received"}`}>
                                        <div className="content">
                                            <p>{msg.msgTxt}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <ChatInput handleSendMsg={handleSendMsg} />
                </ChatBoxContainer>
            )}
        </>
    );
}