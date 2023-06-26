import { Layout } from "antd";
//import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AppHeader } from "./layout/app-header/AppHeader";
import { Outlet } from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

const { Content, Footer } = Layout;


export function App() {
    const currentYear = new Date().getFullYear();
    const dispatch = useDispatch();

    useEffect(() => {

    }, []);

   /* useEffect(() => {
        if (user) {
            dispatch(setLoggedInUser(user));
        }
    }, [user, dispatch]);*/

    return (
        <Layout>
            <AppHeader />
            <Content
                className="site-layout"
                style={{ padding: "0 50px", marginTop: 64 }}
            >
                <Outlet />
            </Content>
            <Footer style={{ textAlign: "center" }}>With App © {currentYear}</Footer>
        </Layout>
    );
}
