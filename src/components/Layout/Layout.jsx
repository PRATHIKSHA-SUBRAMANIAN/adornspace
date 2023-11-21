import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from '../../routers/Routers';
import AdminNav from "../../admin/AdminNav";
import { useLocation } from "react-router-dom";

const Layout = () => {
    const location = useLocation();

    // Check if the current route is the login or signup page
    const isLoginPage = location.pathname === "/login";
    const isSignupPage = location.pathname === "/signup";

    return (
        <>
            {location.pathname.startsWith('/dashboard') ? <AdminNav /> : (isLoginPage || isSignupPage) ? null : <Header />}
            <div>
                <Routers />
            </div>
            {(isLoginPage || isSignupPage) ? null : <Footer />}
        </>
    );
};

export default Layout;
