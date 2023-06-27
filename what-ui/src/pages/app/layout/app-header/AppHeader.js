import { Header } from "antd/lib/layout/layout";
import {useNavigate} from "react-router-dom";
import {APP, LOGIN} from "../../../../constants/RoutePathConstants";
import {getUserById, logout} from "../../../../redux/actions/AuthActions";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "antd";
import {selectUserEmail} from "../../../../redux/selectors/AuthSelector";
import {useEffect} from "react";
import {JWT_TOKEN_KEY} from "../../../../constants/APIConstants";
import jwtDecode from "jwt-decode";


export function AppHeader() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem(JWT_TOKEN_KEY);
    const email = useSelector(selectUserEmail);

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken ? decodedToken.user_id : null;
            if (userId) {
                dispatch(getUserById(userId));
            }
        }
    }, []);


    const handleLogout = () => {
        dispatch(logout());
        navigate(LOGIN);
    };

    return (
        <Header style={{
            position: 'fixed',
            zIndex: 1000,
            width: '100%',
            background: '#adadad',
            display: "flex",
            alignItems: "center"
        }}>
            <div style={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "flex-end",
                alignItems: "center"
            }}>
                <p style={{color: '#fff', fontWeight: 'bold', marginRight: 20}}>{email}</p>
            </div>
            <Button cla onClick={handleLogout}>Logout</Button>
        </Header>
    )
}
