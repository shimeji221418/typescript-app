import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { FC, memo } from "react";
import PrimaryButton from "../atoms/PrimaryButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: () => void;
};

const CheckModal: FC<Props> = memo((props) => {
  const { isOpen, onClose, handleDelete } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>本当に削除しますか？</ModalHeader>
        <ModalCloseButton />
        <ModalBody color="red" textAlign="center">
          ※削除してしまうと元に戻すことは出来ません
        </ModalBody>
        <ModalFooter>
          <PrimaryButton onClick={onClose} color="cyan">
            Close
          </PrimaryButton>
          <PrimaryButton onClick={handleDelete} color="red">
            Delete
          </PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default CheckModal;
