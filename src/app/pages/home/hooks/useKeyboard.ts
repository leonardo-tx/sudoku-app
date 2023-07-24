import { useAtom } from "jotai";
import { EMPTY } from "../../../../core/constants/sudoku-constants";
import currentAtom from "../atoms/currentAtom";
import sudokuAtom from "../atoms/sudokuAtom";

export default function useKeyboard(): {
    selectedNumber: number;
    onClick: (value: number) => void;
} {
    const [current, setCurrent] = useAtom(currentAtom);
    const [board, setBoard] = useAtom(sudokuAtom);

    const onClick = (value: number): void => {
        if (current.selectedCell === null) {
            setCurrent(previous => ({...previous, selectedNumber: previous.selectedNumber !== value ? value : -1}));
            return;
        }

        const [x, y] = current.selectedCell;

        if (!board[y][x].mutable) return;
        setBoard((previous) => {
            const updatedBoard = previous.map(row => [...row]);
            updatedBoard[y][x] = { number: (value === updatedBoard[y][x].number) ? EMPTY : value, mutable: true };

            return updatedBoard;
        });
    };

    return { selectedNumber: current.selectedNumber, onClick };
}