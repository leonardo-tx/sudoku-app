import type DetailedCell from "./DetailedCell";

export type DetailedSudoku = DetailedCell[][];

export type SimpleSudoku = number[][];

export interface LocalStorageSudoku {
    originalBoard: number[][];
    missingCells: number[];
}