import { atom } from "jotai";
import { getBoard } from "../../../../data/board-storage";
import { createEmptyBoard } from "../../../../core/sudoku/sudoku-generator";
import { parseDetailedSudoku, getOriginalChallenge } from "../../../../core/sudoku/sudoku-utils";
import { DetailedSudoku } from "../../../../core/models/sudoku-models";
import { challengeIsValid } from "../../../../core/sudoku/sudoku-solver";

function getSudokuBoard(): DetailedSudoku {
    const board = getBoard();
    if (board === null) return parseDetailedSudoku(createEmptyBoard());

    const challengeBoard = getOriginalChallenge(board);
    if (!challengeIsValid(challengeBoard)) return parseDetailedSudoku(createEmptyBoard());

    return board;
}

const sudokuAtom = atom(getSudokuBoard());

export default sudokuAtom;