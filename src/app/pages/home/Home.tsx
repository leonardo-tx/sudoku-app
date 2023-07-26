import { JSX, useEffect } from "react";
import styled from "styled-components";
import { saveBoard } from "../../../data/board-storage";
import Board from "./components/Board";
import { Box } from "@chakra-ui/react";
import { isEmpty } from "../../../core/sudoku/sudoku-utils";
import CreateGame from "./components/CreateGame";
import GameActions from "./components/GameActions";
import { useAtomValue } from "jotai";
import sudokuAtom from "./atoms/sudokuAtom";

export default function Home(): JSX.Element {
    const { challenge } = useAtomValue(sudokuAtom);
    
    useEffect(() => {
        saveBoard(challenge);
    }, [challenge])

    return(
        <GameContainer>
            <Board />
            <ActionContainer>
                {isEmpty(challenge) ? <CreateGame /> : <GameActions />}
            </ActionContainer>
        </GameContainer>
    )
}

const GameContainer = styled(Box)`
    display: grid;
    grid-template-columns: 1fr clamp(0px, 100%, 600px) 1fr;
    grid-template-areas:
        "game-left board game-right"
    ;
    position: relative;
    width: 100%;
    gap: 2em;

    @media only screen and (max-width: 1024px) {
        display: flex;
        flex-direction: column;
        gap: 1em;
        align-items: center;
    }
`;

const ActionContainer = styled(Box)`
    grid-area: game-right;
    display: flex;
    align-items: center;
`;