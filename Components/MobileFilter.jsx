import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import React from "react";

export default function MobileFilters({ children, button }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleButtonClick = () => {
        onOpen();
    };

    return (
        <>
            {button ? (
                React.cloneElement(button, { onClick: handleButtonClick })
            ) : (
                <Button onPress={onOpen}>فیلترها</Button>
            )}
            <Modal
                placement="center"
                classNames={{ base: 'max-h-[80vh]', body: 'p-0', wrapper: 'z-[1050]', backdrop: 'z-[1049]' }}
                scrollBehavior="inside"
                size="5xl"
                isOpen={isOpen}
                onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader />
                            <ModalBody>
                                {children}
                            </ModalBody>
                            <ModalFooter />
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
