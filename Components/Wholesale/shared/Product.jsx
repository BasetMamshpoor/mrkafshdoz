import Link from 'next/link';
import style from './Product.module.css'
import Image from 'next/image';
import { FaStar } from "react-icons/fa";

const Product = ({ id, name, rate, image, is_available }) => {
    return (
        <>
            <div className={style.Xqera}>
                <Link href={`/wholesale/${id}`}>
                    <div className={style.imgP}>
                        <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={0} height={0} sizes='100vw' className='w-full h-full object-cover' src={image} alt="" />
                    </div>
                    <div className={style.info}>
                        <div className={style.descP}>
                            <h3>{name}</h3>
                        </div>
                        {rate > 0 && <div className={style.rate}>
                            <span>{(rate)}</span>
                            <div className={style.star}><FaStar /></div>
                        </div>}
                        {is_available ? <></> :
                            <div className={style.etmamMojody}>
                                <b>ناموجود</b>
                            </div>}
                    </div>
                </Link>
            </div>
        </>
    );
};

export default Product;