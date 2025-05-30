import Timer from 'Components/Timer';
import style from './OfferTime.module.css';
import Image from 'next/image';
import img from 'public/Images/IncredibleOffer.svg'
const OfferTime = ({ off_date_to }) => {
    const timeDiscount = ((new Date(off_date_to).getTime() - new Date().getTime()) / 1000)

    return (
        <>
            <div className={style.offer}>
                <div className="">
                    {!!off_date_to && (timeDiscount < 86400) && <>
                        <Timer time={timeDiscount} message='اتمام تخفیف' classNameTimer={style.timer} classNameEtmam={style.EtmamTakhfif} withProgress={false} />
                    </>}
                </div>
                <div className={style.img}>
                    <Image src={img.src} width={0} height={0} sizes='100vw' className='w-full h-full object-cover' alt='' />
                </div>
            </div>
        </>
    );
};

export default OfferTime;