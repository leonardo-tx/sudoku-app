import { useAtom } from "jotai";
import currentAtom from "../atoms/currentAtom";
import { useEffect, useState } from "react";
import { EMPTY } from "../../../../core/constants/sudoku-constants";
import sudokuAtom from "../atoms/sudokuAtom";

export default function useCell(coords: [x: number, y: number]): {
    number: number;
    mutable: boolean;
    highlightNumber: boolean;
    selected: boolean
    onClick: () => void;
} {
    const [board, setBoard] = useAtom(sudokuAtom);
    const [current, setCurrent] = useAtom(currentAtom);
    const [highlightNumber, setHighlightNumber] = useState(false);

    useEffect(() => {
        const runStateUpdate = async () => {
            const ms = 25 * Math.floor(Math.random() * 5);
            await new Promise<void>(resolve => setTimeout(resolve, ms));
            setHighlightNumber(highlight);  
        };

        let highlight = false;
        if (number !== EMPTY) {
            if (current.selectedCell !== null && !selected) {
                highlight = board[current.selectedCell[1]][current.selectedCell[0]].number === number;
            }
            else if (current.selectedNumber !== -1) {
                highlight = current.selectedNumber === number;
            }
        }
        runStateUpdate();
    }, [current, board])

    const [x, y] = coords;
    const { number, mutable } = board[y][x];
    const selected = cellsAreEqual(current.selectedCell, coords);

    const onClick = (): void => {
        if (current.selectedNumber === -1) {
            setCurrent(previous =>  ({...previous, selectedCell: !cellsAreEqual(previous.selectedCell, coords) ? coords : null}))
            return;
        }
        if (!mutable) return;
        setBoard((previous) => {
            const updatedBoard = previous.map(row => [...row]);
            updatedBoard[y][x] = { number: updatedBoard[y][x].number === current.selectedNumber ? 0 : current.selectedNumber, mutable: true };

            return updatedBoard;
        });
    }

    return { number, mutable, highlightNumber, selected, onClick }
}

function cellsAreEqual(selectedCell: [x: number, y: number] | null, currentCell: [x: number, y: number]): boolean {
    return selectedCell !== null && selectedCell[0] === currentCell[0] && selectedCell[1] === currentCell[1];
}