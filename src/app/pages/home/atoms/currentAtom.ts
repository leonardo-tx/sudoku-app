import { atom } from "jotai";

const _currentAtom = atom<{
    selectedCell: [x: number, y: number] | null;
    selectedNumber: number;
}>({ 
    selectedCell: null, 
    selectedNumber: -1
});

const currentAtom = atom(
    (get) => get(_currentAtom),
    (get, set, arg: [x: number, y: number] | number) => {
        const previous = get(_currentAtom);

        if (typeof arg === "number") {
            set(_currentAtom, { ...previous, selectedNumber: arg === previous.selectedNumber ? -1 : arg });
            return;
        }
        if (coordsAreEqual(previous.selectedCell, arg)) {
            set(_currentAtom, { ...previous, selectedCell: null });
            return;
        }
        set(_currentAtom, { ...previous, selectedCell: arg });
    }
);

function coordsAreEqual(previousCell: [x: number, y: number] | null, currentCell: [x: number, y: number]): boolean {
    return previousCell !== null && previousCell[0] === currentCell[0] && previousCell[1] === currentCell[1];
}

export default currentAtom;