import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import "../styles/FormContainer.css"
import logo from "../assets/amitabh-bachchan.svg";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {loginRoute} from "../utils/APIRoutes.js";
import {useEffect} from "react";
import {Button, TextField} from "@mui/material";

const FormContainer = styled.div``;

const CustomTextField = styled(TextField)(({ theme }) => ({
    backgroundColor: 'transparent',
    padding: '1rem',
    border: '0.1rem solid indigo',
    borderRadius: '0.4rem',
    color: 'white',
    width: '100%',
    fontSize: '1rem',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'indigo',
        },
        '&:hover fieldset': {
            borderColor: 'darkblue',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'rebeccapurple',
        },
    },
    '& .MuiInputBase-input': {
        color: 'white',
    },
    '& .MuiInputLabel-root': {
        color: 'dimgrey',
        '&.Mui-focused': {
            color: 'rebeccapurple',
        },
    },
}));

export default function Login() {
    const {register, handleSubmit, watch, formState: {errors}} = useForm({mode: "onSubmit"});
    const usrNam = watch("usrNam");
    const passwd = watch("passwd");
    const navigate = useNavigate();
    const toastOpts = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };
    const onValid = async () => {
        console.log("validating...", loginRoute);
        const {data} = await axios.post(loginRoute, {
            usrNam: usrNam,
            passwd: passwd
        });
        if (data.status) {
            toast.success("Login successful :)", toastOpts);
            localStorage.setItem("chat-app-user", JSON.stringify(data.user));
            navigate("/");
        } else {
            toast.error(data.msg, toastOpts);
        }
    };
    const onInvalid = () => {
        Object.values(errors).forEach(err => {
            toast.error(err.message, toastOpts);
        });
    }
    const validOpts = {
        usrNam: {
            required: "Username is required!"
        },
        passwd: {
            required: "Password is required!"
        }
    };
    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
            navigate("/");
        }
    }, []);
    return (
        <>
            <FormContainer className="form-container">
                <form onSubmit={handleSubmit(onValid, onInvalid)}>
                    <div className="brand">
                        <img src={logo} alt="logo"/>
                        <h1>Bol Bachchan</h1>
                    </div>
                    <CustomTextField type="text" label="Username" {...register("usrNam", validOpts.usrNam)}/>
                    <CustomTextField type="password" label="Password" {...register("passwd", validOpts.passwd)}/>
                    <Button type="submit">
                        Login
                    </Button>
                    <span>
                        Don't have an account?
                        <Link to="/signup">Signup</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer></ToastContainer>
        </>
    )
}