import styled from "styled-components";
import {toast, ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import axios from "axios";
import "../styles/Avatars.css";
import {Buffer} from "buffer/";
import loader from "../assets/loader.gif";
import {setAvatarRoute} from "../utils/APIRoutes.js";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

export default function SetAvatar() {
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState("");
    const [isLoad, setIsLoad] = useState(true);
    const navigate = useNavigate();
    const toastOpts = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };
    const setPfp = async () => {
        if (selectedAvatar === "") {
            toast.error("Select an avatar!", toastOpts)
        } else {
            const usr = await JSON.parse(localStorage.getItem("chat-app-user"));
            const {data} = await axios.post(`${setAvatarRoute}/${usr._id}`, {img: avatars[selectedAvatar]});
            if (data.isSet) {
                usr.isAvatarImgSet = true;
                usr.avatarImg = data.img;
                localStorage.setItem("chat-app-user", JSON.stringify(usr));
                navigate("/");
            } else {
                toast.error("Error setting avatar. Try again!");
            }
        }
    };
    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login");
        }
    }, []);
    useEffect(() => {
        async function getAvatars() {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const img = await axios.get(`https://api.dicebear.com/9.x/avataaars/svg?seed=${Math.floor(Math.random() * 1000)}`);
                const buf = new Buffer(img.data);
                data.push(buf.toString("base64"));
                setAvatars(data);
                setIsLoad(false);
            }
        }

        getAvatars().then();
    }, []);
    return (
        <>
            {isLoad && <Container className="avatar-container">
                <img src={loader} alt="loader" className="loader"/>
            </Container>}
            <Container className="avatar-container">
                <h1 className="title-container">
                    Pick a cool avatar for yourself ;)
                </h1>
                <div className="avatars">
                    {avatars.map((avatar, idx) => {
                        return (
                            <div key={idx} className={`avatar ${selectedAvatar === idx ? "selected" : ""}`}>
                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(idx)}/>
                            </div>
                        )
                    })}
                </div>
                <Button className="submit-btn" onClick={setPfp}>
                    Set avatar as profile picture
                </Button>
            </Container>
            <ToastContainer></ToastContainer>
        </>
    )
}

const Container = styled.div``;