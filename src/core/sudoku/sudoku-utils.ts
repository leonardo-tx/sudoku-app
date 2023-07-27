import { BOARD_LENGTH, EMPTY, MATRIX_LENGTH, MAX_NUMBER, MIN_NUMBER } from "../constants/sudoku-constants";
import type { DetailedSudoku, SimpleSudoku } from "../models/sudoku-models";

export function clearBoard(board: SimpleSudoku): void {
    for (let y = 0; y < BOARD_LENGTH; y++) {
        for (let x = 0; x < BOARD_LENGTH; x++) {
            board[y][x] = EMPTY;
        }
    }
}

export function getOriginalChallenge(arg: DetailedSudoku): SimpleSudoku {
    const result: SimpleSudoku = new Array(BOARD_LENGTH);

    for (let y = 0; y < BOARD_LENGTH; y++) {
        result[y] = new Array(9);
        for (let x = 0; x < BOARD_LENGTH; x++) {
            result[y][x] = arg[y][x].mutable ? EMPTY : arg[y][x].number;
        }
    }
    return result;
}

export function parseDetailedSudoku(arg: SimpleSudoku): DetailedSudoku {
    const result: DetailedSudoku = new Array(BOARD_LENGTH);

    for (let y = 0; y < BOARD_LENGTH; y++) {
        result[y] = new Array(9);
        for (let x = 0; x < BOARD_LENGTH; x++) {
            const number = arg[y][x];
            const mutable = number === EMPTY;
            result[y][x] = { mutable, number };
        }
    }
    return result;
}

export function isEmpty(board: DetailedSudoku): boolean {
    for (let y = 0; y < BOARD_LENGTH; y++) {
        for (let x = 0; x < BOARD_LENGTH; x++) {
            if (board[y][x].number !== EMPTY) return false;
        }
    }
    return true;
}

export function isSimpleSudoku(arg: any): arg is SimpleSudoku {
    if (!Array.isArray(arg) || arg.length !== BOARD_LENGTH) return false;

    for (let y = 0; y < BOARD_LENGTH; y++) {
        if (!Array.isArray(arg[y]) || arg[y].length !== BOARD_LENGTH) return false;
        for (let x = 0; x < BOARD_LENGTH; x++) {
            if (!Number.isInteger(arg[y][x]) || arg[y][x] < EMPTY || arg[y][x] > MAX_NUMBER) return false;
        }
    }
    return true;
}

export function countEmptyCells(board: SimpleSudoku): number {
    let count = 0;
    for (let y = 0; y < BOARD_LENGTH; y++) {
        for (let x = 0; x < BOARD_LENGTH; x++) {
            if (board[y][x] === EMPTY) count++;
        }
    }
    return count;
}

export function hasEmptyCell(board: DetailedSudoku): boolean {
    for (let y = 0; y < BOARD_LENGTH; y++) {
        for (let x = 0; x < BOARD_LENGTH; x++) {
            if (board[y][x].number === EMPTY) return true;
        }
    }
    return false;
}

export function getAllNumbers(): number[] {
    return Array.from({ length: MAX_NUMBER }, (_, i) => i + MIN_NUMBER);
}

export function getValidNumbers(board: SimpleSudoku, x: number, y: number): number[] {
    const numbers: number[] = [];
    const originalNumber = board[y][x];

    for (let i = MIN_NUMBER; i <= MAX_NUMBER; i++) {
        board[y][x] = i;
        if (validateCell(board, x, y)) numbers.push(i);
    }
    board[y][x] = originalNumber;
    return numbers;
}

export function validateAllCells(board: SimpleSudoku): boolean {
    for (let y = 0; y < BOARD_LENGTH; y++) {
        for (let x = 0; x < BOARD_LENGTH; x++) {
            if (board[y][x] === EMPTY) continue;
            if (!validateCell(board, x, y)) return false;
        }
    }
    return true;
}

export function validateCell(board: SimpleSudoku, x: number, y: number): boolean {
    return validateLines(board, x, y) && validateMatrix(board, x, y);
}

function validateMatrix(board: SimpleSudoku, x: number, y: number): boolean {
    const initialY = Math.floor(y / MATRIX_LENGTH) * MATRIX_LENGTH;
    const initialX = Math.floor(x / MATRIX_LENGTH) * MATRIX_LENGTH;

    const number = board[y][x];

    for (let currentY = initialY; currentY < initialY + MATRIX_LENGTH; currentY++) {
        for (let currentX = initialX; currentX < initialX + MATRIX_LENGTH; currentX++) {
            if (board[currentY][currentX] === number && (y !== currentY || x !== currentX)) return false;
        }
    }
    return true;
}

function validateLines(board: SimpleSudoku, x: number, y: number): boolean {
    const number = board[y][x];

    for (let currentY = 0; currentY < BOARD_LENGTH; currentY++) {
        if (board[currentY][x] === number && currentY !== y) return false;
    }
    for (let currentX = 0; currentX < BOARD_LENGTH; currentX++) {
        if (board[y][currentX] === number && currentX !== x) return false;
    }
    return true;
}