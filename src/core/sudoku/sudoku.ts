import { BOARD_TOTAL_LENGTH, EMPTY } from "../constants/sudoku-constants";
import type { SimpleSudoku } from "../models/sudoku-models";
import { fillBoard } from "./sudoku-generator";
import { challengeIsValid } from "./sudoku-solver";
import { clearBoard } from "./sudoku-utils";

export function createChallenge(board: SimpleSudoku, difficulty: Difficulty) {
    const cellsToRemove = getCellsToRemove(difficulty);
    let remainingCells = cellsToRemove;
    
    let cells = Array.from({ length: BOARD_TOTAL_LENGTH }, (_, i) => i);
        
    while (remainingCells !== 0) {
        if (cells.length < remainingCells) {
            clearBoard(board);
            fillBoard(board);

            remainingCells = cellsToRemove;
            cells = Array.from({ length: BOARD_TOTAL_LENGTH }, (_, i) => i);
        }
        const index = Math.floor(Math.random() * cells.length);
        const cell = cells[index];
        const y = Math.floor(cell / 9)
        const x = cell % 9;

        const cellNumber = board[y][x];

        cells.splice(index, 1);
        board[y][x] = EMPTY;

        if (!challengeIsValid(board)) { board[y][x] = cellNumber; continue; }
        
        remainingCells--;
    }
}

function getCellsToRemove(difficulty: Difficulty): number {
    switch (difficulty) {
        case Difficulty.Beginner:
            return Math.floor(Math.random() * 2) + 23;
        case Difficulty.Easy:
            return Math.floor(Math.random() * 4) + 37;
        case Difficulty.Medium:
            return Math.floor(Math.random() * 3) + 46;
        case Difficulty.Hard:
            return Math.floor(Math.random() * 6) + 49;
        case Difficulty.Expert:
            return Math.floor(Math.random() * 3) + 56;
    }
}

export enum Difficulty {
    Beginner,
    Easy,
    Medium,
    Hard,
    Expert
}