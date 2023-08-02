import { Grid, GridItem, Text } from "@chakra-ui/react";
import { JSX } from "react";
import styled from "styled-components";
import useKeyboard from "../hooks/useKeyboard";

export default function Keyboard(): JSX.Element {
    const { selectedNumber, onClick } = useKeyboard();

    return (
        <GridKeyboard p={2}>
            {keys.map((key) => (
                <GridItem 
                    aria-label={`Tecla de número ${key.value}`}
                    borderRadius="0.375rem"
                    transition="background-color 0.2s ease"
                    onClick={() => onClick(key.value)} 
                    bg={selectedNumber === key.value ? "#9366F5" : "#3a3a3a"} 
                    key={key.value} 
                    as="button"
                >
                    <Text fontWeight="bold" fontSize="clamp(18px, min(3.5vw, 3vh), 24px)">{key.name ?? key.value}</Text>
                </GridItem>
            ))}
        </GridKeyboard>
    );
}

const GridKeyboard = styled(Grid)`
    grid-template-rows: repeat(2, min(50px, 10vw, 9vh));
    grid-template-columns: repeat(5, min(50px, 10vw, 9vh));
    gap: 8px;
`;

const keys = [
    { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, 
    { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 0, name: "X" }
];