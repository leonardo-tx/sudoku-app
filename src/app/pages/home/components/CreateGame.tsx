import { VStack, ButtonGroup, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import { JSX } from "react";
import { FaGamepad } from "react-icons/fa6";
import { Difficulty } from "../../../../core/sudoku/sudoku";
import useCreateGame from "../hooks/useCreateGame";

export default function CreateGame(): JSX.Element {
    const { loading, isOpen, onOpen, onClose, createBoard } = useCreateGame();
    
    return (
        <>
            <ButtonGroup size="lg" spacing={6} variant="outline">
                <Button
                    colorScheme="purple" 
                    leftIcon={<FaGamepad />}
                    spinnerPlacement="start"
                    loadingText="Gerando..."
                    isLoading={loading} 
                    onClick={onOpen}
                >
                    Novo jogo
                </Button>
            </ButtonGroup>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Selecione a dificuldade</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <VStack spacing={3} alignItems="stretch">
                            {Object.keys(Difficulty).filter((v) => isNaN(parseInt(v))).map((value, i) => (
                                <Button key={i} size="lg" onClick={() => createBoard(i)}>{value}</Button>
                            ))}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}