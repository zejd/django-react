import React, {useEffect} from 'react';
import './App.css';
import { App as AppDashboard } from './pages/app/App';
import {
    APP,
    LOGIN,
    REGISTER
} from "./constants/RoutePathConstants";
import {Routes, Route, useNavigate, useLocation, Navigate} from 'react-router-dom';
import {Home} from "./pages/app/layout/home/Home";
import {Login} from "./pages/auth/login/Login";
import {Register} from "./pages/auth/register/Register";
import { useSelector } from 'react-redux';
import { selectUserEmail } from "./redux/selectors/AuthSelector";
import jwtDecode from 'jwt-decode';
import {JWT_TOKEN_KEY} from "./constants/APIConstants";

function App() {
    const navigate = useNavigate();
    const token = localStorage.getItem(JWT_TOKEN_KEY);
    let userAuthenticated = true;
    if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds

        if (decodedToken.exp < currentTime) {
            // Token has expired
            userAuthenticated = false;
        }
    } else {
        userAuthenticated = false;
    }
    const email = useSelector(selectUserEmail);

    const location = useLocation();
    useEffect(() => {
        if (email) {
            if (!location.pathname.includes("app")) {
                navigate(APP);
            }
        }
    }, [email, location.pathname])

  return (
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTER} element={<Register />} />
        {userAuthenticated &&
            <Route path={APP} element={<AppDashboard />} >
              <Route index element={<Home />} />
            </Route>
        }
        <Route
            path="*"
            element={<Navigate to={LOGIN} />}
        />
      </Routes>
  );
}

export default App;
