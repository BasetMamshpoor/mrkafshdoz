import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";
import Verify from "../Auth/verify";
import { useContext, useState } from "react";
import { FaCircleRight } from "react-icons/fa6";
import useAxios from '../../hooks/useAxios';
import { Functions } from "providers/FunctionsProvider";

export default function VerifyModal({ setPasswordState, state, titleEn, otpCode, onOpenParentChange }) {
    const { AxiosPrivate } = useAxios()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [otp, setOtp] = useState()
    const { SwalStyled } = useContext(Functions)

    const handleSubmit = async () => {
        if (!!setPasswordState) {
            if (otp.length == 5) {
                setPasswordState(previous => {
                    const { old_password, ...prev } = previous
                    return { password: '', password_confirmation: '', otp }
                })
                onOpenChange(false)
            }
        } else
            await AxiosPrivate.put('user/update', { [titleEn]: state, otp })
                .then(res => SwalStyled.fire('انجام شد', res.data.message || 'با موفقیت ویرایش شد', 'success'))
                .catch(err => SwalStyled.fire('انجام نشد', err.response?.data.message || 'ویرایش نشد', 'error'))
                .finally(() => {
                    onOpenChange(false);
                    onOpenParentChange(false);
                    window.location.reload()
                })
    }

    return (
        <>
            {!!otpCode
                ? <div className="text-sm cursor-pointer" onClick={onOpen} title="تغییر کد تایید">
                    <FaCircleRight />
                </div>
                : !!setPasswordState
                    ? <div className="text-sm text-blue-500 cursor-pointer" onClick={onOpen}>
                        رمزعبور خودرا فراموش کرده ام!
                    </div>
                    : <Button Button onPress={onOpen}>
                        ارسال کد
                    </Button >
            }
            <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} dir="rtl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                            <ModalBody>
                                <Verify mobile={state} justOtp setOtp={setOtp} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    بستن
                                </Button>
                                <Button disabled={!!otp ? false : true} color="primary" onPress={handleSubmit}>
                                    تایید
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
