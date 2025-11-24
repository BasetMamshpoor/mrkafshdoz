import style from './ManageAddresses.module.css'
import {MdKeyboardArrowLeft, MdMailOutline, MdPersonOutline} from "react-icons/md";
import {BsSignpost2} from "react-icons/bs";
import {BiMobileAlt} from "react-icons/bi";
import {e2p} from 'Functions/ConvertNumbers';
import {ImRadioChecked, ImRadioUnchecked} from "react-icons/im";
import dynamic from "next/dynamic";
import {Modal, ModalContent, useDisclosure} from "@heroui/react";

const NewAddress = dynamic(() => import('Components/Profile/Address/NewAddress'), {
    ssr: false,
    loading: () => <p className="text-center mt-10">در حال بارگذاری نقشه...</p>,
});


const ManageAddresses = ({addresses, dispatch, index, setIndex, reload}) => {
    const {isOpen, onOpenChange, onOpen} = useDisclosure()
    return (
        <>
            <div className="flex justify-end cursor-pointer mt-1 text-[#19bfd3]" onClick={onOpen}>
                تغییر یا ویرایش آدرس <MdKeyboardArrowLeft/>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>

                    <div className={style.main}>
                        <NewAddress first reload={reload}/>

                        <div className={style.list}>
                            {addresses.map((a, i) => {
                                return (
                                    <label className={style.address} htmlFor={a.id} key={a.id} onClick={() => {
                                        setIndex(i);
                                        onOpenChange();
                                        dispatch({type: "ADD_ADDRESS", payload: {id: a.id}})
                                    }}>
                                        <input id={a.id} type="radio" name='address' hidden value={a.id}
                                               defaultChecked={index == i ?? false}/>
                                        <span className={style.radio}><ImRadioUnchecked/><ImRadioChecked/></span>
                                        <div className={style.content}>
                                            <p className={style.addresstext}>{a.address}</p>
                                            <div className={style.detail}>
                                                <div className={style.row}>
                                                    <div className={style.icon}><MdMailOutline/></div>
                                                    <p>{e2p(a.postalcode)}</p>
                                                </div>
                                                <div className={style.row}>
                                                    <div className={style.icon}><BiMobileAlt/></div>
                                                    <p>{e2p(a.cellphone)}</p>
                                                </div>
                                                <div className={style.row}>
                                                    <div className={style.icon}><MdPersonOutline/></div>
                                                    <p>{a.name}</p>
                                                </div>
                                                <div className={style.row}>
                                                    <div className={style.icon}><BsSignpost2/></div>
                                                    <p>{e2p(a.number)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                )
                            })}
                        </div>
                    </div>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ManageAddresses;