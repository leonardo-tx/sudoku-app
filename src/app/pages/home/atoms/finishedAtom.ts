import { atom } from "jotai";
import sudokuAtom from "./sudokuAtom";
import { hasEmptyCell } from "../../../../core/sudoku/sudoku-utils";
import { BOARD_LENGTH } from "../../../../core/constants/sudoku-constants";

const finishedAtom = atom<boolean>(
    (get) => {
        const { challenge, complete } = get(sudokuAtom);
        if (hasEmptyCell(challenge)) return false;

        for (let y = 0; y < BOARD_LENGTH; y++) {
            for (let x = 0; x < BOARD_LENGTH; x++) {
                if (challenge[y][x].number !== complete[y][x]) return false;
            }
        }
        return true;
    }
);

export default finishedAtom;