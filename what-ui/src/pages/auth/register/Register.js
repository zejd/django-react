import './Register.css';
import {RegisterForm} from "./components/RegisterForm";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { register } from '../../../redux/actions/AuthActions';
import {useDispatch} from "react-redux";

export function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = (data) => {
        dispatch(register(data.firstName, data.lastName, data.email, data.password, navigate));
    }

    const dispatch = useDispatch();

    return (
        <div className="register-container">
            <RegisterForm handleSubmit={handleRegister} isLoading={isLoading} />
        </div>
    )
}
