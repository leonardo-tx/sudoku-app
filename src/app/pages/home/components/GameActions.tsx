import { JSX } from "react";
import Keyboard from "./Keyboard";
import { ButtonGroup, VStack } from "@chakra-ui/react";
import Undo from "./Undo";
import Check from "./Check";

export default function GameActions(): JSX.Element {
    return (
        <VStack spacing={4}>
            <Keyboard />
            <ButtonGroup variant="ghost" colorScheme="purple">
                <Undo />
                <Check />
            </ButtonGroup>
        </VStack>
    );
}