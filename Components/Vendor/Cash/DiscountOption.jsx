import { Modal, ModalContent, ModalBody, useDisclosure, ModalHeader, ModalFooter, Select, SelectItem } from "@heroui/react";
import { useEffect, useState } from "react";
import useAxios from '../../../hooks/useAxios';

const DiscountOption = ({ edit, setReload, data: Data }) => {
    const { AxiosPrivate } = useAxios()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [data, setData] = useState({})

    useEffect(() => {
        if (!!Data) setData(Data)
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (edit) {
            await AxiosPrivate.put(`discount/update/${Data.id}`, data)
                .then(res => {
                    alert(res.data.message)
                    onOpenChange(false)
                    setReload(Math.random())
                })
                .catch(err => alert(err.response?.data.message || 'مشکلی پیش آمده'))
        } else {
            await AxiosPrivate.post(`discount/store`, data)
                .then(res => {
                    alert(res.data.message)
                    onOpenChange(false)
                    setReload(Math.random())
                    setData({})
                })
                .catch(err => alert(err.response?.data.message || 'مشکلی پیش آمده'))
        }

    }

    return (
        <>
            {edit ? <div onClick={onOpen} className='hover:bg-gray-300 cursor-pointer duration-250 rounded-full p-1'><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></div>
                : <button onClick={onOpen} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
                     focus:outline-none shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-2.5 text-center"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>}
            <Modal isOpen={isOpen} scrollBehavior={'inside'} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader/>
                            <ModalBody className="pt-0">
                                <form className="flex flex-wrap items-center gap-x-2 gap-y-8" dir="rtl" onSubmit={handleSubmit}>
                                    <div className=" min-w-28 max-w-[100%] w-full">
                                        <Select
                                            variant="underlined"
                                            label='نوع'
                                            onChange={handleChange}
                                            name="discount_type_id"
                                            isRequired
                                            selectedKeys={[data.discount_type_id?.toString()]}
                                        >
                                            <SelectItem key="1" className="flex-row-reverse" textValue="تومانی" >
                                                <p className="flex items-center justify-end w-full">تومانی</p>
                                            </SelectItem>
                                            <SelectItem key="2" className="flex-row-reverse" textValue="درصدی">
                                                <p className="flex items-center justify-end w-full">درصدی</p>
                                            </SelectItem>
                                        </Select>
                                    </div>
                                    <div className="min-w-28 max-w-[100%] w-full">
                                        <div className="relative">
                                            <input required type="text" id="outlined_1" name='title' value={data.title} onChange={handleChange}
                                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" />
                                            <label htmlFor="outlined_1" className="absolute rounded-lg duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">عنوان</label>
                                        </div>
                                    </div>
                                    <div className="min-w-28 max-w-[100%] w-full">
                                        <div className="relative">
                                            <input required type="text" id="outlined_1" name='code' value={data.code} onChange={handleChange}
                                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" />
                                            <label htmlFor="outlined_1" className="absolute rounded-lg duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">کد</label>
                                        </div>
                                    </div>
                                    <div className=" min-w-28 max-w-[100%] w-full">
                                        <div className="relative">
                                            <input required type="datetime-local" id="outlined_2" name='expires_at' value={(data.expires_at)?.split(':', 2).join(':')} onChange={handleChange}
                                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" />
                                            <label htmlFor="outlined_2" className="absolute rounded-lg duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">تاریخ انقضا</label>
                                        </div>
                                    </div>
                                    <div className=" min-w-28 max-w-[49%] w-full">
                                        <div className="relative">
                                            <input required type="text" id="outlined_3" name='count' value={data.count} onChange={handleChange}
                                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" />
                                            <label htmlFor="outlined_3" className="absolute rounded-lg duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">تعداد</label>
                                        </div>
                                    </div>
                                    <div className=" min-w-28 max-w-[49%] w-full">
                                        <div className="relative">
                                            <input required type="text" id="outlined_4" name='value' value={data.value} onChange={handleChange}
                                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" />
                                            <label htmlFor="outlined_4" className="absolute rounded-lg duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">مقدار</label>
                                        </div>
                                    </div>
                                    <div className="w-full flex sm:items-center items-start gap-4 sm:text-base text-sm sm:flex-row flex-col">
                                        <p>ایجاد: {new Date(data.created_at).toLocaleString('fa-IR')}</p><span className="sm:block hidden">|</span>
                                        <p>ویرایش: {new Date(data.updated_at).toLocaleString('fa-IR')}</p>
                                    </div>
                                    <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
                                        focus:outline-none shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto mb-3">ثبت</button>
                                </form>
                            </ModalBody>
                            <ModalFooter />
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default DiscountOption;