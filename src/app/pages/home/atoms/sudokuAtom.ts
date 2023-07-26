import { atom } from "jotai";
import { getBoard } from "../../../../data/board-storage";
import { createEmptyBoard, fillAllCells } from "../../../../core/sudoku/sudoku-generator";
import { parseDetailedSudoku, getOriginalChallenge, parseSimpleSudoku } from "../../../../core/sudoku/sudoku-utils";
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
    const completeBoard = parseSimpleSudoku(board);
    fillAllCells(completeBoard, 0, 0);

    return { challenge: board, complete: completeBoard };
}

const sudokuAtom = atom(getSudokuBoards());

export default sudokuAtom;