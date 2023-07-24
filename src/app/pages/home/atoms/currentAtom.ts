import { atom } from "jotai";

const currentAtom = atom<{
    selectedCell: [x: number, y: number] | null;
    selectedNumber: number;
}>({
    selectedCell: null,
    selectedNumber: -1
});

export default currentAtom;