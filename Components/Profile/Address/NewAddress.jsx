import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
    Textarea, Input,
    Alert, addToast,
} from "@heroui/react";
import {MapContainer, TileLayer, Marker, useMapEvents, useMap} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {SlLocationPin as Loc} from "react-icons/sl";
import {LuSearch as SearchIcon} from "react-icons/lu";
import {FiEdit3 as Edit} from "react-icons/fi";
import {GoPlus as Plus} from "react-icons/go";
import style from "./AddressForm.module.css";
import Inputt from 'Components/Input';
import validation from 'Functions/AddAddressValidation'
import axios from "axios";
import {Functions} from "../../../providers/FunctionsProvider";
import {useRouter} from "next/router";
import {Authorization} from "../../../providers/AuthorizationProvider";


const customIcon = new L.Icon({
    iconUrl: '/Images/pin-location.svg',
    iconRetinaUrl: '/Images/pin-location.svg',
    iconSize: [35, 55],
    iconAnchor: [17, 55],
});

const MapController = ({position}) => {
    const map = useMap();
    useEffect(() => {
        if (position) map.flyTo(position, 15, {animate: true});
    }, [position]);
    return null;
};

const NewAddress = ({edit, first, reload}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [step, setStep] = useState(edit ? 2 : 1);
    const [position, setPosition] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [locating, setLocating] = useState(false);
    const [address, setAddress] = useState({})
    const [touch, setTouch] = useState({})
    const {SwalStyled} = useContext(Functions)
    const {tokens, user} = useContext(Authorization)
    const headers = {Authorization: `${tokens?.token_type} ${tokens?.access_token}`}
    const router = useRouter()

    let errors = validation(address)

    useEffect(() => {
        if (edit) {
            const {latitude, longitude, ...other} = edit
            setPosition({lat: latitude, lng: longitude});
            setAddress(other);
        }
    }, [edit]);

    // useEffect(() => {
    //     if (!edit && isOpen && position) {
    //         fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}&accept-language=fa`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 if (data?.address) {
    //                     setAddress({address: data.display_name});
    //                 } else {
    //                     setAddress({});
    //                 }
    //             })
    //             .catch(() => setAddress({}));
    //     }
    // }, [position, isOpen, edit]);

    const handleSearch = (e) => {
        e.preventDefault();
        const form = new FormData(e.target)
        let searchQuery = form.get('search')
        if (!searchQuery) return;
        setLoading(true);
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=ir&accept-language=fa`)
            .then(res => res.json())
            .then(results => setSearchResults(results))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    };

    const handleSelectLocation = (result) => {
        const {lat, lon, display_name} = result;
        const newPos = {lat: parseFloat(lat), lng: parseFloat(lon)};
        setPosition(newPos);
        setAddress({address: display_name});
        setSearchResults([]);
    };

    const handleMyLocation = () => {
        if (!navigator.geolocation) {
            addToast({
                description: 'مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند',
                color: 'danger',
            })
            return;
        }
        setLocating(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const {latitude, longitude} = pos.coords;
                setPosition({lat: latitude, lng: longitude});
                setLocating(false);
            },
            (err) => {
                addToast({
                    description: 'دسترسی به موقعیت مکانی رد شد',
                    color: 'danger',
                })
                setLocating(false);
            },
            {enableHighAccuracy: true, timeout: 10000}
        );
    };

    function LocationMarker() {
        useMapEvents({
            click(e) {
                const {lat, lng} = e.latlng;
                setPosition({lat, lng});
            },
        });

        return position ? <Marker position={position} icon={customIcon}/> : null;
    }

    const handleChange = (name, value) => {
        setAddress(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (Object.keys(errors).length) {
            setTouch({
                title: true,
                address: true,
                province: true,
                city: true,
                number: true,
                postalcode: true,
                name: true,
                cellphone: true
            })
        } else {
            console.log({
                ...address,
                latitude: position.lat,
                longitude: position.lng
            })
            if (!!edit) {
                await axios.put(`/address/${edit.id}`, {
                    ...address,
                    latitude: position.lat,
                    longitude: position.lng
                }, {headers})
                    .then(res => {
                        SwalStyled.fire('.ویرایش شد', res.data.message, 'success')
                        reload()
                        onOpenChange()
                        setAddress({})
                    })
                    .catch(err => SwalStyled.fire('.ویرایش نشد', err.response.data.message, 'error'))
            } else {
                await axios.post('/address', {
                    ...address,
                    latitude: position.lat,
                    longitude: position.lng
                }, {headers})
                    .then(res => {
                        SwalStyled.fire('.ثبت شد', res.data.message, 'success')
                        reload()
                        onOpenChange()
                        setAddress({})
                        if (router && !!router.query.backUrl) router.push(router.query.backUrl)
                    })
                    .catch(err => SwalStyled.fire('.ثبت نشد', err.response.data.message, 'error'))
            }
        }
    }

    return (
        <>
            {first && <Button
                onPress={onOpen}
                variant="bordered"
                className="border-Secondary-900 text-Secondary-900 font-bold max-w-44 w-full"
                radius="sm">
                افزودن آدرس
            </Button>}
            {edit && <Button
                onPress={onOpen}
                variant="light"
                isIconOnly
                className="text-Secondary-900 font-bold max-w-44 w-full"
                radius="sm">
                <Edit/>
            </Button>}

            <Modal classNames={{backdrop: "z-[1001]", wrapper: "z-[1002]"}} scrollBehavior="inside" isOpen={isOpen}
                   onOpenChange={onOpenChange} size="5xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-lg font-bold text-center">
                                {step === 1 ? "انتخاب موقعیت روی نقشه" : "ثبت و ویرایش آدرس"}
                                {step === 2 ?
                                    <div onClick={() => setStep(1)}
                                         className="text-primary-700 mr-4 cursor-pointer">تغییر موقعیت روی
                                        نقشه</div> : ""}
                            </ModalHeader>

                            <ModalBody className="space-y-4">
                                {step === 1 && (
                                    <>
                                        <div className="h-[500px] rounded-xl overflow-hidden relative">
                                            <MapContainer
                                                center={[35.7219, 51.3347]}
                                                zoom={15}
                                                style={{height: "100%", width: "100%"}}
                                            >
                                                <TileLayer
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                <LocationMarker position={position} setPosition={setPosition}
                                                                attribution='&copy; OpenStreetMap contributors'
                                                />
                                                <MapController position={position}/>
                                            </MapContainer>
                                            <form className="absolute top-4 right-4 left-14 z-[1000]"
                                                  onSubmit={handleSearch}>
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        onClear={() => setSearchResults([])}
                                                        isClearable
                                                        placeholder="جستجو در نقشه (مثلاً خیابان ولیعصر)"
                                                        name="search"
                                                        radius="sm"
                                                        variant="faded"
                                                        classNames={{inputWrapper: "h-fit", base: "flex-1"}}
                                                        startContent={<Button
                                                            type="submit"
                                                            color="default"
                                                            variant="light"
                                                            isIconOnly
                                                            isLoading={loading}
                                                        >
                                                            <SearchIcon/>
                                                        </Button>}
                                                    />
                                                    <Button
                                                        color="warning"
                                                        variant="solid"
                                                        isIconOnly
                                                        onPress={handleMyLocation}
                                                        isLoading={locating}
                                                    >
                                                        <Loc/>
                                                    </Button>
                                                </div>
                                                {searchResults.length > 0 && (
                                                    <ul className="absolute z-50 bg-white shadow-lg border rounded-md mt-1 max-h-56 overflow-y-auto w-full flex flex-col">
                                                        {searchResults.map((r, i) => (
                                                            <li key={i}
                                                                onClick={() => handleSelectLocation(r)}
                                                                className="w-full p-2 hover:bg-gray-100">
                                                                <p className="cursor-pointer  text-right text-sm line-clamp-1">
                                                                    {r.display_name}
                                                                </p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </form>
                                        </div>
                                        <Button
                                            className="max-w-[50%] w-full mx-auto"
                                            color="primary"
                                            onPress={() => position && setStep(2)}
                                            disabled={!position}
                                        >
                                            ثبت موقعیت
                                        </Button>
                                    </>
                                )}

                                {step === 2 && (
                                    <form onSubmit={handleSubmit}>
                                        <div className={style.content}>
                                            <div className={style.oneField}>
                                                <div className={style.field}>
                                                    <label className={style.label}>نام مکان <span
                                                        className={style.star}>*</span></label>
                                                    <Inputt value={address?.title} type='text' name='title'
                                                            result={handleChange}
                                                            className={`${style.input} ${(touch.title && !!errors.title) ? style.error : ''}`}
                                                            placeholder='خانه, محل کار, ...'/>
                                                </div>
                                            </div>
                                            <div className={style.twoField}>
                                                <div className={style.field}>
                                                    <label className={style.label}>استان <span
                                                        className={style.star}>*</span></label>
                                                    <Inputt type='text' name='province'
                                                            result={handleChange}
                                                            value={address?.province || address?.state}
                                                            className={`${style.input} ${(touch.province && !!errors.province) ? style.error : ''}`}
                                                    />
                                                </div>
                                                <div className={style.field}>
                                                    <label className={style.label}>شهر <span
                                                        className={style.star}>*</span></label>
                                                    <Inputt type='text' name='city'
                                                            result={handleChange}
                                                            value={address?.city}
                                                            className={`${style.input} ${(touch.city && !!errors.city) ? style.error : ''}`}
                                                    />
                                                </div>
                                            </div>
                                            <div className={style.twoField}>
                                                <div className={style.twoSmallField}>
                                                    <div className={style.field}>
                                                        <label className={style.label}>پلاک <span
                                                            className={style.star}>*</span></label>
                                                        <Inputt value={address?.number} isNumber={true} name='number'
                                                                type="number" result={handleChange}
                                                                className={`${style.input} ${(touch.number && !!errors.number) ? style.error : ''}`}/>
                                                    </div>
                                                    <div className={style.field}>
                                                        <label className={style.label}>واحد</label>
                                                        <Inputt value={address?.unit} name='unit' type="number"
                                                                result={handleChange} className={style.input}/>
                                                    </div>
                                                </div>
                                                <div className={style.field}>
                                                    <label className={style.label}>کد پستی <span
                                                        className={style.star}>*</span></label>
                                                    <Inputt value={address?.postalcode} type='number' name='postalcode'
                                                            result={handleChange}
                                                            className={`${style.input} ${(touch.postalcode && !!errors.postalcode) ? style.error : ''}`}/>
                                                </div>
                                            </div>
                                            <div className={style.oneField}>
                                                <div className={style.field}>
                                                    <label className={style.label}>نشانی پستی <span
                                                        className={style.star}>*</span></label>
                                                    <textarea
                                                        className={`${style.textarea} ${(touch.address && !!errors.address) ? style.error : ''}`}
                                                        dir='rtl' name="address"
                                                        onChange={(e) => handleChange('address', e.target.value)}
                                                        value={address.address}></textarea>
                                                    {touch.address && errors.address &&
                                                        <span className={style.error_text}>{errors.address}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.resiver}>
                                            <div className={style.twoField}>
                                                <div className={style.field}>
                                                    <label className={style.label}>نام و نام خانوادگی گیرنده <span
                                                        className={style.star}>*</span></label>
                                                    <Inputt value={address?.name} type='text' name='name'
                                                            result={handleChange}
                                                            className={`${style.input} ${(touch.name && !!errors.name) ? style.error : ''}`}/>
                                                </div>
                                                <div className={style.field}>
                                                    <label className={style.label}>شماره موبایل <span
                                                        className={style.star}>*</span></label>
                                                    <Inputt value={address?.cellphone} name='cellphone'
                                                            result={handleChange}
                                                            className={`${style.input} ${(touch.cellphone && !!errors.cellphone) ? style.error : ''}`}
                                                            placeholder='مثل: ۰۹۱۲۳۴۵۶۷۸۹'/>
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            type="submit"
                                            className="bg-green-600 text-white w-full"
                                        >
                                            ثبت نهایی آدرس
                                        </Button>
                                    </form>
                                )}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default NewAddress;