import { useAtom, useAtomValue } from "jotai";
import currentAtom from "../atoms/currentAtom";
import { useEffect, useState } from "react";
import { EMPTY } from "../../../../core/constants/sudoku-constants";
import sudokuAtom from "../atoms/sudokuAtom";
import validateAtom from "../atoms/validateAtom";

export default function useCell(coords: [x: number, y: number]): {
    number: number;
    mutable: boolean;
    highlightNumber: boolean;
    selected: boolean;
    wrong: boolean;
    onClick: () => void;
} {
    const [{ challenge, complete }, setSudoku] = useAtom(sudokuAtom);
    const [current, setCurrent] = useAtom(currentAtom);
    const validate = useAtomValue(validateAtom);
    const [highlightNumber, setHighlightNumber] = useState(false);
    const [wrong, setWrong] = useState(false);

    const [x, y] = coords;
    const { number, mutable } = challenge[y][x];
    const selected = coordsAreEqual(current.selectedCell, coords);

    useEffect(() => {
        if (!validate || !mutable || number === EMPTY || number === complete[y][x]) return;
        setWrong(true);
    }, [validate]);

    useEffect(() => {
        setWrong(false);
    }, [number])

    useEffect(() => {
        const runStateUpdate = async () => {
            const ms = 25 * Math.floor(Math.random() * 5);
            await new Promise<void>(resolve => setTimeout(resolve, ms));
            setHighlightNumber(highlight);  
        };

        let highlight = false;
        if (number !== EMPTY) {
            if (current.selectedCell !== null && !selected) {
                highlight = challenge[current.selectedCell[1]][current.selectedCell[0]].number === number;
            }
            else if (current.selectedNumber !== -1) {
                highlight = current.selectedNumber === number;
            }
        }
        runStateUpdate();
    }, [current, challenge])

    const onClick = (): void => {
        if (current.selectedNumber === -1) {
            setCurrent(coords);
            return;
        }
        if (!mutable) return;
        setSudoku((previous) => {
            const updatedBoard = previous.challenge.map(row => [...row]);
            updatedBoard[y][x] = { number: updatedBoard[y][x].number === current.selectedNumber ? 0 : current.selectedNumber, mutable: true };

            return { ...previous, challenge: updatedBoard };
        });
    }

    return { number, mutable, highlightNumber, selected, wrong, onClick }
}

function coordsAreEqual(selectedCell: [x: number, y: number] | null, currentCell: [x: number, y: number]): boolean {
    return selectedCell !== null && selectedCell[0] === currentCell[0] && selectedCell[1] === currentCell[1];
}