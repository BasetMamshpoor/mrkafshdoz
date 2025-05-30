import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Specifications from 'Components/Detaile/Specifications';
import Comments from 'Components/Detaile/Comments';
import Stock from 'Components/Wholesale/Stock';
import DetaileSlider from 'Components/Slider/DetaileSlider'
import style from './Detaile.module.css'
import Attributes from 'Components/Detaile/Attributes';
import { AiOutlineSafety, AiOutlineFieldTime } from 'react-icons/ai'
import { BsTruck } from 'react-icons/bs'
import Baner from 'Components/Wholesale/Baner';
import Breadcrumb from 'Components/Breadcrumb';
import Loading from 'Components/Loading';
import OfferTime from 'Components/Detaile/OfferTime';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import { Authorization } from 'providers/AuthorizationProvider';
import Link from 'next/link';
import useAxios from 'hooks/useAxios';
import { Functions } from 'providers/FunctionsProvider';
import axios from 'axios';

const Wholesale = ({ initialData }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { AxiosPrivate } = useAxios()
    const { user } = useContext(Authorization)
    const { SwalStyled } = useContext(Functions)
    const router = useRouter()
    const { id } = router.query
    const [data, setData] = useState(initialData);
    const [loading2, setLoading2] = useState(!initialData);
    const [color, setColor] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!initialData && id) {
            setLoading2(true);
            axios
                .get(`/products/show/${id}`)
                .then(response => setData(response.data))
                .catch(() => setData(null))
                .finally(() => setLoading2(false));
        }
    }, [id]);

    useEffect(() => {
        if (!!data && data.product.colors) {
            const validColor = data.product.colors.find(color =>
                color.sizes.some(size => size.stock > 0)
            );

            if (validColor) {
                setColor(validColor);
            }
        }
    }, [data]);

    if (loading2) return <Loading />;

    if (!data) return <div className='w-full h-screen flex items-center justify-center'>محصول یافت نشد!</div>;

    const handleRequest = async () => {
        setLoading(true)
        await AxiosPrivate.post('/store-user-product-detail', { product_id: id })
            .then(res => SwalStyled.fire({
                title: 'ثبت شد',
                text: res.data.message,
                icon: "success"
            }))
            .catch(err => SwalStyled.fire({
                title: 'ثبت نشد',
                text: err.response?.data.message || '',
                icon: "error"
            }))
            .finally(() => {
                onOpenChange(false)
                setLoading(false)
            })
    }
    return (
        <>
            <main className={style.main} dir='ltr'>
                <section dir='rtl'>
                    <div className="container">
                        <Breadcrumb breadcrumb={data.breadcrumb} />
                    </div>
                </section>

                <section className={style.Iwalh}>
                    <div className="container">
                        <div className={`row pb-3 ${style.mobile_Dis}`}>
                            <div className="col-lg-7 d-flex flex-column" dir="rtl">
                                <div className={style.Cxwply}>
                                    <h1>{data.product.name}</h1>
                                </div>
                                <div className="row flex-grow-1">
                                    <div className={`col-lg-${!!data.product.colors.length ? '6' : '12'} ps-0`}>
                                        <Attributes product={data.product} />
                                    </div>
                                    {!!data.product.colors.length && <div className="col-lg-6 p-0">
                                        <div className={style.esohby}>
                                            <div className={style.cKyf}>
                                                <div className={style.pxty}>
                                                    <AiOutlineSafety />
                                                </div>
                                                <span>ضمانت اصل بودن و سلامت کالا</span>
                                            </div>
                                            <div className={style.cKyf}>
                                                <div className={style.pxty}>
                                                    <BsTruck />
                                                </div>
                                                <span>ارسال فوری و آسان با پست</span>
                                            </div>
                                            <div className={style.cKyf}>
                                                <div className={style.pxty}>
                                                    <AiOutlineFieldTime />
                                                </div>
                                                <span>۲۴ ساعته و ۷ روز هفته</span>
                                            </div>
                                        </div>
                                        <div className={style.zOiOz}>
                                            <div className={`${style.Redxws} ${style.Fcesop}`}>
                                                <p>آماده ارسال</p>
                                            </div>
                                            <div className={`${style.Redxws} ${style.LttOp}`}>
                                                <p>گارانتی اصالت و سلامت فیزیکی کالا</p>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                                <Stock onOpen={onOpen} product={data.product} color={color} setColor={setColor} />
                            </div>
                            <div className="col-lg-5">
                                {!!data.product.off_date_to && <OfferTime off_date_to={data.product.off_date_to} />}
                                <DetaileSlider color={color.color} Images={data.product.images} isBookmarked={data.product.isBookmarked}
                                    id={data.product.id} />
                            </div>
                        </div>
                    </div>
                </section>

                <section className={style.hFcte} dir="rtl">
                    <div className="container">
                        <div className={style.c9C4xp}>
                            <ul className={style.p_Eoxf}>
                                <li className={`${style.ycrQl} ${style.obActive}`}><a
                                    href="#Specifications">مشخصات</a></li>
                                <li className={style.ycrQl}><a href="#comments">نظرات</a></li>
                            </ul>
                        </div>

                        <div className="row">

                            <div className="col-lg-9 ps-3">
                                <Specifications data={data.product.attributes} />

                                <Comments id={id} rate={data.product.rate} />
                            </div>

                            <div className="col-lg-3 p-0">
                                <Baner onOpen={onOpen} product={data.product} color={color} />
                            </div>
                        </div>
                    </div>
                </section>
                <Modal isOpen={isOpen} hideCloseButton placement='center' onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader />
                                <ModalBody>
                                    {Object.keys(user).length
                                        ? <div className='flex flex-col gap-4'>
                                            <p>ادمین در اسرع وقت با این شماره تماس خواهد گرفت</p>
                                            <span className='text-left text-primary-600'>{user.mobile}</span>
                                        </div>
                                        : <p>برای ادامه ثبت سفارش لطفا وارد حساب کاربری خود شوید</p>}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        انصراف
                                    </Button>
                                    {Object.keys(user).length ?
                                        <Button isDisabled={loading} color="success" variant='flat' onPress={handleRequest}>
                                            ارسال درخواست
                                        </Button>
                                        :
                                        <Link href='/auth/login' className='h-10 min-w-20 bg-primary-50 select-none appearance-none centerOfParent whitespace-nowrap rounded-lg px-4 text-small text-primary'>
                                            ورود
                                        </Link>
                                    }
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </main>
        </>
    );
};
export async function getServerSideProps({ params }) {
    try {
        const response = await axios.get(`/products/show/${params.id}`);
        const data = response.data.data
        if (!data.product.is_major) {
            return {
                redirect: {
                    destination: `/products/${params.id}`,
                    permanent: false,
                },
            };
        }
        return {
            props: { initialData: data },
        };
    } catch {
        return {
            props: { initialData: null },
        };
    }
}

export default Wholesale;