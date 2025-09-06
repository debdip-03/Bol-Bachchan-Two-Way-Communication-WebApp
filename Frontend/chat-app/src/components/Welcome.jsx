import styled from "styled-components";
import namaste from "../assets/amitabh-bachchan-namaskar-clean.gif";
import "../styles/WelcomeContainer.css";

const WelcomeContainer = styled.div``;

export default function Welcome(props) {
    return (
        <WelcomeContainer className="welcome-container">
            <img src={namaste} alt="namaste"/>
            <h1>
                Namaskar, <span>{props.currUsr.usrNam}!</span>
            </h1>
            <h3>
                Select a chat to start messaging
            </h3>
        </WelcomeContainer>
    )
}