import { ChakraProvider } from "@chakra-ui/react";
import { JSX } from "react";
import theme from "./modules/base/settings/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./modules/base/components/Layout";
import Home from "./pages/home/Home";

export default function App(): JSX.Element {
    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter basename={import.meta.env.DEV ? "/" : "/sudoku-app/"}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}