import { useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { SimpleSudoku } from "../../../../core/models/sudoku-models";
import { parseDetailedSudoku } from "../../../../core/sudoku/sudoku-utils";
import { saveNewBoard } from "../../../../data/board-storage";
import { Difficulty } from "../../../../core/sudoku/sudoku";
import { useSetAtom } from "jotai";
import sudokuAtom from "../atoms/sudokuAtom";

let worker: Worker;

export default function useCreateGame(): {
    loading: boolean;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    createBoard: (difficulty: Difficulty) => void;
} {
    const [loading, setLoading] = useState(false);
    const setBoard = useSetAtom(sudokuAtom);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        worker = new Worker(new URL('../../../workers/sudokuWorker.ts', import.meta.url), { type: "module" });
        worker.onmessage = (event: MessageEvent<SimpleSudoku>) => {
            saveNewBoard(event.data);
            
            const board = parseDetailedSudoku(event.data);
            setBoard(board);
            setLoading(false);
        }

        return () => worker.terminate();
    }, []);

    const createBoard = (difficulty: Difficulty): void => {
        setLoading(true);
        worker.postMessage(difficulty);
        onClose();
    }

    return { loading, isOpen, onOpen, onClose, createBoard };
}