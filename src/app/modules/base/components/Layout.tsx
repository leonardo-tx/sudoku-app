import { JSX } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout(): JSX.Element {
    return (
        <>
            <Header />
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </>
    );
}