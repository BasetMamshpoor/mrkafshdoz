import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure, ModalFooter,
} from "@heroui/react";
import {AiOutlineDelete} from "react-icons/ai";
import axios from "axios";
import {useContext, useState} from "react";
import {Functions} from "../../../providers/FunctionsProvider";
import Cookies from "js-cookie";

export default function ViewStory({id, cover, title, video, reload}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [loading, setLoading] = useState(false);
    const {SwalStyled} = useContext(Functions)
    const token = JSON.parse(Cookies.get('token'))


    const handleDelete = async (onClose) => {
        SwalStyled.fire({
            title: "آیا مطمئن هستید؟",
            text: "!شما نمی توانید این استوری را برگردانید",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "بله حذف شود"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true);
                    await axios.delete(`/admin/stories/${id}`, {
                        headers: {
                            Authorization: `${token?.token_type} ${token?.access_token}`
                        }
                    });
                    SwalStyled.fire("حذف شد", "استوری با موفقیت حذف شد.", "success");
                    onClose();
                    reload(Math.random());
                } catch (error) {
                    SwalStyled("حذف نشد", "مشکلی در حذف استوری پیش آمد.", "error");
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    return (
        <>
            <div
                className="border rounded-xl p-2 hover:shadow cursor-pointer"
                onClick={onOpen}
            >
                <img
                    src={cover}
                    alt={title}
                    className="w-full h-32 object-cover rounded-md mb-2"
                />
                <p className="text-sm font-semibold truncate text-center">{title}</p>
            </div>

            <Modal
                hideCloseButton
                placement="center"
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior="inside"
                classNames={{
                    backdrop:
                        "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 z-[1060]",
                    base: "z-[1060]",
                    wrapper: "z-[1060]",
                    body: "overflow-hidden centerOfParent",
                }}
            >
                <ModalContent className="bg-white rounded-lg">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex justify-between items-center">
                                <span className="text-base font-bold">{title}</span>
                                <Button
                                    isIconOnly
                                    color="danger"
                                    variant="light"
                                    size="sm"
                                    isDisabled={loading}
                                    onPress={() => handleDelete(onClose)}
                                >
                                    <AiOutlineDelete className="w-5 h-5"/>
                                </Button>
                            </ModalHeader>

                            <ModalBody>
                                <div className="w-full mx-auto">
                                    <video height="350" width="100%" controls>
                                        <source src={video} type="video/mp4"/>
                                        مرورگر شما از پخش این فیلم پشتیبانی نمی‌کند
                                    </video>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={onClose}>بستن</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
