import {useEffect, useState} from "react";
import styled from "styled-components";
import "../styles/ContactContainer.css";
import logo from "../assets/amitabh-bachchan.svg";

const ContactContainer = styled.div``;

export default function Contacts(props) {
    const [currUsrNam, setCurrUsrNam] = useState(undefined);
    const [currUsrImg, setCurrUsrImg] = useState(undefined);
    const [currSelected, setCurrSelected] = useState(undefined);

    useEffect(() => {
        if (props.currUsr) {
            setCurrUsrNam(props.currUsr.usrNam);
            setCurrUsrImg(props.currUsr.avatarImg);
        }
    }, [props.currUsr]);

    const changeCurrChat = (idx, contact) => {
        setCurrSelected(idx);
        props.changeChat(contact);
    };
    return (
        <>
            {currUsrNam && currUsrImg && (
                <ContactContainer className="contact-container">
                    <div className="brand">
                        <img src={logo} alt="logo"/>
                        <h3>Bol Bachchan</h3>
                    </div>
                    <div className="contacts">
                        {props.contacts.map((contact, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className={`contact ${idx === currSelected ? "selected" : ""}`}
                                    onClick={() => changeCurrChat(idx, contact)}
                                >
                                    <div className="avatar">
                                        <img
                                            src={`data:image/svg+xml;base64,${contact.avatarImg}`}
                                            alt="avatar"
                                        />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.usrNam}</h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                            <img src={`data:image/svg+xml;base64,${currUsrImg}`} alt="avatar"/>
                        </div>
                        <div className="username">
                            <h2>{currUsrNam}</h2>
                        </div>
                    </div>
                </ContactContainer>
            )}
        </>
    );
}