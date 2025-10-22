import { Modal, ModalContent, ModalBody, useDisclosure, ModalHeader } from "@heroui/react";
import { useContext, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useAxios from '../../../hooks/useAxios';
import { BsTruck } from "react-icons/bs";
import { useRouter } from "next/router";
import { Functions } from "providers/FunctionsProvider";

const SendOrder = ({ order_id, setOnOrder }) => {
    const { AxiosPrivate } = useAxios()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [data, setData] = useState({ method: '', code: '' })
    const [loading, setLoading] = useState(false)
    const { replace, query } = useRouter();
    const { SwalStyled } = useContext(Functions)

    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const OrderList = () => {
        setOnOrder()
        const { order, ...queries } = query
        replace({ pathname: '/admin/orders', query: queries });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await AxiosPrivate.patch(`/order/update/${order_id}`, { order_status_id: 3, postal_reference: data })
            .then(res => {
                SwalStyled.fire({
                    title: "سفارش ارسال شد",
                    text: res.data.message,
                    icon: "success",
                });
                OrderList()
            })
            .catch(err => SwalStyled.fire({
                title: 'سفارش ارسال نشد',
                text: err.response?.data.message,
                icon: "error",
            }))
            .finally(() => setLoading(false))
    }

    return (
        <>
            <button type='button' onClick={onOpen} className='centerOfParent rounded-lg !bg-blue-500 text-white py-1.5 px-3 gap-4 text-sm'><BsTruck />ارسال سفارش</button>

            <Modal placement="center" isOpen={isOpen} size="xl" scrollBehavior={'inside'} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader dir="rtl" className="pr-12" />
                            <ModalBody>
                                <form className="flex flex-col items-center" dir="rtl" onSubmit={handleSubmit}>
                                    <div className="relative pb-6 mb-4 min-w-28 max-w-[100%] w-full">
                                        <div className="relative">
                                            <input required type="text" id="outlined_1" name='method' value={data.method} onChange={handleChange}
                                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" placeholder="" />
                                            <label htmlFor="outlined_1" className="absolute rounded-lg text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">روش ارسال</label>
                                        </div>
                                    </div>
                                    <div className="relative pb-6 mb-4 min-w-28 max-w-[100%] w-full">
                                        <div className="relative">
                                            <input required type="text" id="outlined_2" name='code' value={data.code} onChange={handleChange}
                                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" placeholder="" />
                                            <label htmlFor="outlined_2" className="absolute rounded-lg text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">کد پیگیری ارسال</label>
                                        </div>
                                    </div>
                                    <button disabled={loading} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
                                        focus:outline-none shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">{loading ?
                                            <div role="status">
                                                <AiOutlineLoading3Quarters aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin fill-gray-50" />
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            : 'ارسال'}</button>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default SendOrder;