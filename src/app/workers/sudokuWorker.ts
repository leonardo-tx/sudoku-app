import { Difficulty, createChallenge } from "../../core/sudoku/sudoku";
import { createEmptyBoard, fillBoard } from "../../core/sudoku/sudoku-generator";

self.onmessage = (e: MessageEvent<Difficulty>) => {
    const board = createEmptyBoard();
    fillBoard(board);
    createChallenge(board, e.data);
    
    self.postMessage(board);
};