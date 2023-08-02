import { GridItem, Text } from "@chakra-ui/react";
import { JSX } from "react";
import { EMPTY } from "../../../../core/constants/sudoku-constants";
import styled, { keyframes } from "styled-components";
import useCell from "../hooks/useCell";

interface Props {
    coords: [x: number, y: number];
}

export default function Cell({ coords, coords: [x, y] }: Props): JSX.Element {
    const { number, mutable, highlightNumber, selected, wrong, onClick } = useCell(coords);

    return (
        <Container
            aria-label={`Célula x${x} y${y}`} 
            as="button"
            onClick={onClick}
            $selected={selected}
        >
            {mutable ? <MutableCell $wrong={wrong} /> : <ImmutableCell />}
            <SelectedCell
                $mutable={mutable}
                $highlightNumber={highlightNumber}
                $selected={selected}
            />
            <Text fontWeight="bold" position="absolute" fontSize="clamp(18px, min(3.5vw, 3vh), 24px)">
                {number !== EMPTY ? number : ""}
            </Text>
        </Container>
    );
}

const Container = styled(GridItem)<{
    $selected: boolean;
}>`
    background-color: #202020;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &:focus-visible {
        background-color: #414141;
        outline: none;
    }
`;

const pop = keyframes`
    from {
        transform: scale(1);
    }

    to {
        transform: scale(0);
    }
`;

const show = keyframes`
    from {
        transform: scale(1.1);
    }

    to {
        transform: scale(1);
    }
`;

const SelectedCell = styled.div<{
    $selected: boolean;
    $highlightNumber: boolean;
    $mutable: boolean;
}>`
    position: absolute;
    border-radius: 50%;
    width: 85%;
    height: 85%;
    transition: background-color 0.2s ease;
    background-color: ${(props) => {
        if (props.$highlightNumber) return "#3F0CAC";
        if (props.$selected) {
            return props.$mutable ? "#9366F5" : "#3F0CAC";
        }
        return "trasparent";
    }};
    transform: scale(${props => props.$selected || props.$highlightNumber ? 1 : 0});
    animation: ${props => props.$selected || props.$highlightNumber ? show : pop} 0.4s ease 1;
`;

const ImmutableCell = styled.div`
    background-color: #2e2e2e;
    position: absolute;
    border-radius: 50%;
    width: 85%;
    height: 85%;
`;

const MutableCell = styled.div<{
    $wrong: boolean;
}>`
    background-color: ${props => props.$wrong ? "#cc3535" : "transparent"};
    position: absolute;
    border-radius: 50%;
    width: 85%;
    height: 85%;
`;