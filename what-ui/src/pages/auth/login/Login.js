import './Login.css';
//import {useAppDispatch} from "../../../redux/hooks";
import {useEffect, useState} from "react";
//import {login} from "../../../redux/slices/authSlice";
//import {useLogin} from "./hooks/useLogin";
import {Alert, Button} from "antd";
import {LoginForm} from "./components/LoginForm";
import {useNavigate, useLocation} from "react-router-dom";
import {LOGIN, REGISTER} from "../../../constants/RoutePathConstants";
import { useSelector, useDispatch } from 'react-redux';
import {login, loginSuccess} from '../../../redux/actions/AuthActions';
import {selectError} from "../../../redux/selectors/AuthSelector";



export function Login() {
    const navigate = useNavigate();
    const error = useSelector(selectError);
    const dispatch = useDispatch();

    const handleSubmitLogin = (data) => {
        dispatch(login(data.email, data.password, navigate));
    }

    const navigateToRegister = () => {
        navigate(REGISTER);
    }

    return (
        <div className="login-container">
            {error ? <p style={{color: 'red', marginBottom: 20, fontWeight: 'bold'}}>{error}</p> : ''}
            <LoginForm handleSubmit={handleSubmitLogin} />
            <p>No account? <Button onClick={() => navigateToRegister()} style={{paddingLeft: 0}} type="link">Sign up here</Button></p>
        </div>
    )
}
