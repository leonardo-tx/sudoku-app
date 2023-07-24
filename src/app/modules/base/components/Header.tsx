import { JSX } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Header(): JSX.Element {
    return (
        <HeaderBox>
            <Flex alignItems="center">
                <Link to="/"><Heading as="h1" size="md">Sudoku App</Heading></Link>
            </Flex>
        </HeaderBox>
    );
}

const HeaderBox = styled.header`
    display: grid;
    grid-template-columns: 1fr;
    grid-area: header;
    padding: 0px 12px;
    column-gap: 10px;
`;