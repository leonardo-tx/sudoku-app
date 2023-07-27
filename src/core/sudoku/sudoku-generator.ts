import { BOARD_LENGTH, EMPTY, MATRIX_LENGTH } from "../constants/sudoku-constants";
import type { SimpleSudoku } from "../models/sudoku-models";
import { getAllNumbers, validateCell } from "./sudoku-utils";

export function createEmptyBoard(): SimpleSudoku {
    const board = new Array(BOARD_LENGTH);

    for (let y = 0; y < BOARD_LENGTH; y++) {
        board[y] = new Array(9);
        for (let x = 0; x < BOARD_LENGTH; x++) {
            board[y][x] = EMPTY;
        }
    }
    return board;
}

export function fillBoard(board: SimpleSudoku) {
    fillDiagonalMatrices(board);
    fillAllCells(board);
}

function fillDiagonalMatrices(board: SimpleSudoku): void {
    for (let startPoint = 0; startPoint < BOARD_LENGTH; startPoint += MATRIX_LENGTH) {
        const numbers = getAllNumbers();
        for (let y = startPoint; y < startPoint + 3; y++) {
            for (let x = startPoint; x < startPoint + 3; x++) {
                const index = Math.floor(Math.random() * numbers.length);

                board[y][x] = numbers[index];
                numbers.splice(index, 1);
            }
        }
    }
}

export function fillAllCells(board: SimpleSudoku, x = 3, y = 0): boolean {
    while (board[y][x] !== EMPTY) {
        if (x === 8 && y === 8) return true;
        y = (x + 1 > 8) ? y + 1 : y;
        x = (x + 1) % BOARD_LENGTH;
    }

    for (let i = 1; i < 10; i++) {
        board[y][x] = i;
        if (!validateCell(board, x, y)) { board[y][x] = EMPTY; continue; }
        
        if (fillAllCells(board, (x + 1) % 9, (x + 1 > 8 && y < 8) ? y + 1 : y)) return true;
        board[y][x] = EMPTY;
    }
    return false;
}