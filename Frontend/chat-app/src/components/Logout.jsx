import {useNavigate} from "react-router-dom";
import {BiPowerOff} from "react-icons/bi";
import "../styles/Button.css";
import {logoutRoute} from "../utils/APIRoutes.js";
import axios from "axios";
import {Button} from "@mui/material";

export default function Logout() {
    const navigate = useNavigate();
    const handleClick = async () => {
        try {
            const res = await axios.post(logoutRoute, {}, { withCredentials: true });
            if (res.status === 200) {
                localStorage.clear();
                navigate("/login");
            } else {
                console.error("Logout failed:", res.status, res.data);
            }
        } catch (e) {
            console.error("Logout failed:", e);
        }
    };

    return (
        <Button variant="contained" type="submit" className="button" onClick={handleClick}>
            <BiPowerOff></BiPowerOff>
        </Button>
    )
}