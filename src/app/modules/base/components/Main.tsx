import { JSX } from "react";
import styled from "styled-components";

interface Props {
    children: any;
}

export default function Main({ children }: Props): JSX.Element {
    return (
        <MainBox>
            {children}
        </MainBox>
    );
}

const MainBox = styled.main`
    grid-area: main;
    padding: 12px;
`;