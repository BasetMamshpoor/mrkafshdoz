import React, {useContext} from 'react';
import {
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure, ModalFooter, ModalHeader,
} from "@heroui/react";
import ChangePassword from "./ChangePassword";
import {Functions} from "../../providers/FunctionsProvider";
import {FiEdit} from "react-icons/fi";
import {Authorization} from "../../providers/AuthorizationProvider";

const PasswordModal = ({className}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {SwalStyled} = useContext(Functions)
    const {tokens, user} = useContext(Authorization)

    return (
        <>
            <div className={className}
                 onClick={onOpen}>
                <FiEdit/>
            </div>
            <Modal
                
                isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader />
                            <ModalBody><ChangePassword
                                Swal={SwalStyled}
                                token={tokens}
                                mobile={user.mobile}/></ModalBody>
                            <ModalFooter/>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default PasswordModal;