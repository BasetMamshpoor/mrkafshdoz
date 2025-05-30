import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@heroui/react";
import { useContext, useState } from "react";
import { FiEdit } from 'react-icons/fi'
import VerifyModal from "./VerifyModal";
import useAxios from '../../hooks/useAxios';
import { Functions } from "providers/FunctionsProvider";

export default function EditModal({ titleFa, titleEn, type, verify, value }) {
    const { AxiosPrivate } = useAxios()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [state, setState] = useState(value)
    const { SwalStyled } = useContext(Functions)

    const handleSubmit = async () => {
        await AxiosPrivate.put('user/update', { [titleEn]: state })
            .then(res => {
                window.location.reload()
                SwalStyled.fire('انجام شد', res.data.message || 'با موفقیت ویرایش شد', 'success')
                onOpenChange(false)
            })
            .catch(err => SwalStyled.fire('انجام نشد', err.response?.data.message || 'ویرایش نشد', 'error'))
    }

    return (
        <>
            <div onClick={onOpen} className='cursor-pointer centerOfPareent'>
                <FiEdit />
            </div>
            <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} dir="rtl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">ویرایش {titleFa}</ModalHeader>
                            <ModalBody>
                                <Input
                                    dir="auto"
                                    label={titleFa}
                                    value={state}
                                    type={type}
                                    onValueChange={setState}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    بستن
                                </Button>
                                {verify ? <VerifyModal state={state} titleEn={titleEn} onOpenParentChange={onOpenChange} /> :
                                    <Button color="primary" onPress={handleSubmit}>
                                        ویرایش
                                    </Button>}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
