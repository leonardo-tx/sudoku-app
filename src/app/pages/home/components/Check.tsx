import { IconButton } from "@chakra-ui/react";
import { JSX } from "react";
import { FaCheck } from "react-icons/fa6";

export default function Check(): JSX.Element {
    return (
        <IconButton 
            aria-label="Checa todas as células"
            icon={<FaCheck />} 
        />
    );
}