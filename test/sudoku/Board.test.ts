import { BOARD_LENGTH, EMPTY } from "../../src/core/constants/sudoku-constants";
import { Difficulty, createChallenge } from "../../src/core/sudoku/sudoku";
import { createEmptyBoard, fillBoard } from "../../src/core/sudoku/sudoku-generator";
import { challengeIsValid } from "../../src/core/sudoku/sudoku-solver";
import { validateCell, clearBoard } from "../../src/core/sudoku/sudoku-utils";

const EMPTY_BOARD_TESTS = 1000;
const COMPLETE_BOARD_TESTS = 1000;
const CLEAR_BOARD_TESTS = 1000;

describe('Board test from Sudoku class', () => {
    it('Create empty board', () => {
        testActionPerformance("Create empty board", EMPTY_BOARD_TESTS, 
            () => createEmptyBoard(),
            (board) => {
                for (let y = 0; y < BOARD_LENGTH; y++) {
                    for (let x = 0; x < BOARD_LENGTH; x++) {
                        expect(board[y][x]).toBe(EMPTY);
                    }
                }
            }
        );
    })

    it('Create complete board', () => {
        testActionPerformance("Create complete board", COMPLETE_BOARD_TESTS,
            () => {
                const board = createEmptyBoard();
                fillBoard(board);

                return board;
            },
            (board) => {
                for (let y = 0; y < BOARD_LENGTH; y++) {
                    for (let x = 0; x < BOARD_LENGTH; x++) {
                        expect(validateCell(board, x, y)).toBe(true);
                    }
                }
            }
        );
    })

    it('Create challenge board', () => {
        testActionPerformance("Create challenge board", 100,
            () => {
                const board = createEmptyBoard();
                fillBoard(board);
                createChallenge(board, Difficulty.Expert);

                return board;
            },
            (board) => {
                expect(challengeIsValid(board)).toBe(true);
            }
        );
    })

    it('Clear board', () => {
        const board = createEmptyBoard();
        fillBoard(board);

        testActionPerformance("Clear board", CLEAR_BOARD_TESTS,
            () => {
                clearBoard(board);

                return board;
            },
            (board) => {
                for (let y = 0; y < BOARD_LENGTH; y++) {
                    for (let x = 0; x < BOARD_LENGTH; x++) {
                        expect(board[y][x]).toBe(EMPTY);
                    }
                }
                fillBoard(board);
            }
        );
    })
});

function testActionPerformance(name: string, testCount: number, measure: () => number[][], validation: (board: number[][]) => void): void {
    const times: number[] = [testCount];
        for (let i = 0; i < testCount; i++) {
            const startTime = performance.now();
            const sudoku = measure();
            const endTime = performance.now();

            validation(sudoku);
            times[i] = endTime - startTime;
        }
        let totalTime = 0;
        for (let i = 0; i < testCount; i++) {
            totalTime += times[i];
        }
        const averageTime = totalTime / testCount;

        console.log(`
----------------------------------------------
${name}
----------------------------------------------
Average performance: ${averageTime.toFixed(2)} ms
Number of tests: ${testCount}
        `);
}