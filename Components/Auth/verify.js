import { useContext, useEffect, useRef, useState } from 'react';
import Timer from '../Timer';
import { AxiosPublic } from '../../config/axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { InputOtp } from "@heroui/react";
import { useRouter } from 'next/router';
import { Functions } from 'providers/FunctionsProvider';

const Verify = (props) => {
    const { push } = useRouter()
    const mobile = props.mobile
    const Error = useRef()

    const [value, setValue] = useState("")
    const [response, setResponse] = useState({ expires_in: 0 })
    const [loading, setLoading] = useState(true)
    const [sendAgain, setSendAgain] = useState()
    const { SwalStyled } = useContext(Functions)

    useEffect(() => {
        if (!mobile) push(-1)
        else {
            const send_otp = async () => {
                await AxiosPublic.post('/auth/send-otp', { mobile })
                    .then(res => {
                        SwalStyled.fire('انجام شد', res.data.message || 'با موفقیت ویرایش شد', 'success')
                        setResponse({ expires_in: parseInt(res.data.remain) })
                    })
                    .catch(err => {
                        setResponse({ expires_in: 0 })
                        SwalStyled.fire('انجام نشد', err.response?.data.message || 'ویرایش نشد', 'error')
                    })
                    .finally(() => setLoading(false))
            }
            send_otp()
        }
    }, [sendAgain])

    return (
        <>
            <div className='centerOfParent my-4 h-fit' dir='rtl'>
                <section className='max-w-[400px] w-full p-6 border border-gray-300 bg-white rounded-lg'>
                    <div className='flex flex-col'>
                        <div className='text-purple-900 mb-2 break-words'>
                            رمز یکبار مصرف ارسال شده به {mobile} را وارد کنید.
                        </div>
                        <div className='relative flex flex-col gap-2.5'>
                            <div dir='ltr'>
                                <InputOtp
                                    classNames={{ base: 'w-full', segmentWrapper: 'justify-center w-full', segment: 'flex-[1_0_0] h-12' }}
                                    length={5}
                                    value={value}
                                    onValueChange={e => { setValue(e); props.setOtp(e) }} />
                            </div>
                            <span className='absolute top-[4.5rem] right-1 text-red-600 text-[12px] my-2.5' ref={Error}></span>
                            {!loading ? <div className='flex items-center gap-2.5'>
                                <span>رمز را دريافت نکرده‌ايد؟ </span>
                                <Timer time={response.expires_in} withHour={false} withProgress={false}
                                    message={<p className='cursor-pointer text-blue-600' onClick={e => {
                                        setLoading(true)
                                        setSendAgain(Math.random())
                                    }}>ارسال مجدد</p>} />
                            </div> :
                                <div className="absolute bg-white bg-opacity-60 z-50 h-full w-full flex items-center justify-center">
                                    <div className="flex items-center">
                                        <span className="text-3xl mr-4">Loading</span>
                                        <AiOutlineLoading3Quarters className='animate-spin h-8 w-8 text-gray-800' />
                                    </div>
                                </div>}
                        </div>
                    </div>
                </section>
            </div >
        </>
    );
};

export default Verify;