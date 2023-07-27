import { atom } from "jotai";
import { getBoard } from "../../../../data/board-storage";
import { createEmptyBoard, fillAllCells } from "../../../../core/sudoku/sudoku-generator";
import { parseDetailedSudoku, getOriginalChallenge } from "../../../../core/sudoku/sudoku-utils";
import { DetailedSudoku, SimpleSudoku } from "../../../../core/models/sudoku-models";
import { challengeIsValid } from "../../../../core/sudoku/sudoku-solver";

function getSudokuBoards(): { challenge: DetailedSudoku, complete: SimpleSudoku } {
    const board = getBoard();
    if (board === null) {
        const emptyBoard = createEmptyBoard();
        return { challenge: parseDetailedSudoku(emptyBoard), complete: emptyBoard };
    }

    const challengeBoard = getOriginalChallenge(board);
    if (!challengeIsValid(challengeBoard)) {
        const emptyBoard = createEmptyBoard();
        return { challenge: parseDetailedSudoku(emptyBoard), complete: emptyBoard };
    }

    fillAllCells(challengeBoard, 0, 0);
    return { challenge: board, complete: challengeBoard };
}

const sudokuAtom = atom(getSudokuBoards());

export default sudokuAtom;