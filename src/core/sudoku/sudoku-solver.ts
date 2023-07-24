import { EMPTY, BOARD_LENGTH } from "../constants/sudoku-constants";
import type { SimpleSudoku } from "../models/sudoku-models";
import { getValidNumbers } from "./sudoku-utils";

export function challengeIsValid(board: SimpleSudoku): boolean {
    const solutions = solveBoard(board);
    return solutions === 1;
}

function solveBoard(board: SimpleSudoku): number {
    const emptyPos = findEmptyPosition(board);
    if (emptyPos === null) return 1;

    const [x, y] = emptyPos;
    let count = 0;
    
    const validNumbers = getValidNumbers(board, x, y);
    for (let i = 0; i < validNumbers.length; i++) {
        board[y][x] = validNumbers[i];
        
        count += solveBoard(board);
        board[y][x] = EMPTY;

        if (count > 1) return count;
    }
    return count;
}

function findEmptyPosition(board: SimpleSudoku): [x: number, y: number] | null {
    for (let y = 0; y < BOARD_LENGTH; y++) {
        for (let x = 0; x < BOARD_LENGTH; x++) {
            if (board[y][x] === EMPTY) return [x, y];
        }
    }
    return null;
}