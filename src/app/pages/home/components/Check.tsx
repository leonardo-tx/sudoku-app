import { IconButton } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { JSX } from "react";
import { FaCheck } from "react-icons/fa6";
import sudokuAtom from "../atoms/sudokuAtom";

export default function Check(): JSX.Element {
    const board = useAtomValue(sudokuAtom);

    return (
        <IconButton 
            aria-label="Checa todas as células"
            icon={<FaCheck />} 
        />
    );
}