import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { JSX } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function WinModal({ isOpen, onClose }: Props): JSX.Element {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Parabéns</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    Você resolveu o Sudoku com sucesso! 🏆
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}