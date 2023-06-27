import { Layout } from "antd";
import { AppHeader } from "./layout/app-header/AppHeader";
import { Outlet } from "react-router-dom";
import {useDispatch} from "react-redux";

const { Content, Footer } = Layout;

export function App() {
    const currentYear = new Date().getFullYear();
    const dispatch = useDispatch();

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
