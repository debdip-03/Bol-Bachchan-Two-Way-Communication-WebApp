import styled from "styled-components";
import "../styles/ChatContainer.css";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {allUsrRoute, host} from "../utils/APIRoutes.js";
import Contacts from "../components/Contacts.jsx";
import "../styles/ChatContainer.css";
import Welcome from "../components/Welcome.jsx";
import ChatBox from "../components/ChatBox.jsx";
import {io} from "socket.io-client";

const ChatContainer = styled.div``;

export default function Chat() {
    const [contacts, setContacts] = useState([]);
    const [currUsr, setCurrUsr] = useState(undefined);
    const [currChat, setCurrChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const socket = useRef();

    useEffect(() => {
        async function checkUsr() {
            if (!localStorage.getItem("chat-app-user")) {
                navigate("/login");
            } else {
                setCurrUsr(await JSON.parse(localStorage.getItem("chat-app-user")));
                setIsLoaded(true);
            }
        }
        checkUsr().then();
    }, [navigate]);

    useEffect(() => {
        if (currUsr) {
            socket.current = io(host);
            if (socket.current) {
                socket.current.emit("add-user", currUsr._id);
            } else {
                console.error("Socket connection failed");
            }
        }
    }, [currUsr]);

    useEffect(() => {
        async function getUsers() {
            if (currUsr) {
                if (currUsr.isAvatarImgSet) {
                    try {
                        const data = await axios.post(`${allUsrRoute}/${currUsr._id}`);
                        setContacts(data.data.users);
                    } catch (err) {
                        console.error("Failed to fetch users: ", err);
                    }
                } else {
                    navigate("/setAvatar");
                }
            }
        }

        getUsers().then();
    }, [currUsr, navigate]);

    const handleChatChange = (chat) => {
        setCurrChat(chat);
    };

    return (
        <ChatContainer className="chat-container">
            <div className="inner-container">
                <Contacts currUsr={currUsr} contacts={contacts} changeChat={handleChatChange}></Contacts>
                {isLoaded && currChat === undefined ? (
                    <Welcome currUsr={currUsr}></Welcome>
                ) : (
                    <ChatBox currUsr={currUsr} currChat={currChat} socket={socket}></ChatBox>
                )}
            </div>
        </ChatContainer>
    );
}
