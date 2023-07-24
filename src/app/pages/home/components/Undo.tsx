import { IconButton } from "@chakra-ui/react";
import { FaUndo } from "react-icons/fa";
import { JSX, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { DetailedSudoku } from "../../../../core/models/sudoku-models";
import { BOARD_LENGTH } from "../../../../core/constants/sudoku-constants";
import sudokuAtom from "../atoms/sudokuAtom";

export default function Undo(): JSX.Element {
    const [board, setBoard] = useAtom(sudokuAtom);
    const history = useRef<{ list: HistoryItem[]; lastBoard: DetailedSudoku }>({
        lastBoard: board.map(row => [...row]),
        list: []
    });

    useEffect(() => {
        const historyItem = findHistoryItem(board, history.current.lastBoard);
        if (historyItem === null) return;

        history.current.lastBoard = board.map(row => [...row]);
        history.current.list.push(historyItem);
    }, [board]);

    const onClick = (): void => {
        const historyItem = history.current.list.pop();
        if (historyItem === undefined) return;

        const updatedBoard = board.map(row => [...row]);
        const [x, y] = historyItem.coords;
        
        updatedBoard[y][x] = { ...updatedBoard[y][x], number: historyItem.number };

        history.current.lastBoard = updatedBoard;
        setBoard(updatedBoard.map(row => [...row]));
    };

    return (
        <IconButton 
            aria-label="Reverte a última jogada" 
            icon={<FaUndo />} 
            onClick={onClick}
        />
    );
}

function findHistoryItem(currentBoard: DetailedSudoku, lastBoard: DetailedSudoku): HistoryItem | null {
    for (let y = 0; y < BOARD_LENGTH; y++) {
        for (let x = 0; x < BOARD_LENGTH; x++) {
            if (currentBoard[y][x].number === lastBoard[y][x].number) continue;
            return { coords: [x, y], number: lastBoard[y][x].number };
        }
    }
    return null;
}

interface HistoryItem {
    coords: [x: number, y: number];
    number: number;
}