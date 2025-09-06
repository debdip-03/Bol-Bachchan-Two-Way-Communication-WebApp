import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Chat from "./pages/Chat.jsx";
import SetAvatar from "./pages/SetAvatar.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<Signup></Signup>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/setAvatar" element={<SetAvatar></SetAvatar>}></Route>
                <Route path="/" element={<Chat></Chat>}></Route>
            </Routes>
        </BrowserRouter>
    )
}