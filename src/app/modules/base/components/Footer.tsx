import { JSX } from "react";
import { Button, Link } from "@chakra-ui/react";
import styled from "styled-components";
import { FaGithub } from "react-icons/fa6";

export default function Footer(): JSX.Element {
    return (
        <FooterBox>
            <Link href="https://github.com/leonardo-tx" isExternal>
                <Button variant="link" leftIcon={<FaGithub size={28} />}>Github</Button>
            </Link>
        </FooterBox>
    );
}

const FooterBox = styled.footer`
    grid-area: footer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
`;