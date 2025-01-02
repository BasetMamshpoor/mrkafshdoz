import { useRouter } from 'next/router';
import style from 'styles/Login.module.css'
import Logo from '../../public/Images/logo-no-background-transformed.png'
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Functions } from 'providers/FunctionsProvider';
import Loading from 'Components/Loading';
import { Authorization } from 'providers/AuthorizationProvider';
import Timer from 'Components/Timer';
import { InputOtp } from '@nextui-org/react';

const Verify = () => {
    const { query, push } = useRouter()
    const { mobile, forword } = query

    const Error = useRef()

    const { SwalStyled } = useContext(Functions)
    const { getTokens, getUserInformation } = useContext(Authorization)

    const [value, setValue] = useState('')
    const [response, setResponse] = useState({ expires_in: 0 })
    const [loadin, setLoadin] = useState(true)
    const [sendAgain, setSendAgain] = useState(0)

    useEffect(() => {
        if (!query.mobile)
            push('/auth/login')
        else {
            const send_otp = async () => {
                await axios.post('/auth/send-otp', { mobile: query.mobile })
                    .then(res => {
                        setLoadin(false)
                        SwalStyled.fire('ارسال شد', res.data.message, 'success')
                        setResponse({ expires_in: res.data.remain })
                    })
                    .catch(err => {
                        setLoadin(false)
                        setResponse({ expires_in: 0 })
                        SwalStyled.fire('ارسال نشد', err.response?.data.message, 'error')
                    })
            }
            send_otp()
        }
    }, [sendAgain])
    
    useEffect(() => {
        if (value) {
            handleSubmit({ preventDefault: () => { } })
        }
    }, [value])


    const handleSubmit = async (event) => {
        event.preventDefault()
        if (value.length < 5) {
            Error.current.innerText = 'طول کد 5 واحد است.'
        } else {
            Error.current.innerText = ''
            if (forword) {
                push({ pathname: forword, query: { code: value } }, forword)
            } else {
                const data = {
                    grant_type: 'otp_grant',
                    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
                    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
                    mobile,
                    otp: value,
                    provider: 'users'
                }
                await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/oauth/token`, data)
                    .then(async ({ data }) => {
                        getTokens(data)
                        const user = await getUserInformation(data)
                        await push(`/${user.role}`)
                    })
                    .catch(err => SwalStyled.fire('', err.response?.data.message, 'error'))
            }
        }
    }


    return (
        <>
            <main className={style.main}>
                <section className={style.card}>
                    <div className={style.login}>
                        {!loadin ? <>
                            <div className={style.logo}>
                                <Link href='/'>
                                    <img src={Logo.src} alt="" />
                                </Link>
                            </div>
                            <h1 className={style.title}>رمز یکبار مصرف</h1>
                            <div className={style.info}>
                                رمز یکبار مصرف ارسال شده به ایمیل را وارد کنید.
                            </div>
                            <form className={style.form} onSubmit={handleSubmit}>
                                <div dir='ltr'>
                                    <InputOtp
                                        classNames={{ base: 'w-full', segmentWrapper: 'justify-center w-full', segment: 'flex-[1_0_0] h-12' }}
                                        length={5}
                                        value={value}
                                        onValueChange={setValue} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className={style.error} ref={Error}></span>
                                    <div className={style.expire}>
                                        <span>رمز را دريافت نکرده‌ايد؟ </span>
                                        <Timer time={response.expires_in} withProgress={false} withHour={false}
                                            message={<p className={style.sendAgain} onClick={e => {
                                                setLoadin(true)
                                                setSendAgain(Math.random())
                                            }}>ارسال مجدد</p>} />
                                    </div>
                                </div>
                                <button className={style.btn}>ورود</button>
                            </form>
                            {query.forword ? <Link href={{
                                pathname: '/auth/password',
                                query: { mobile: query.mobile }
                            }}>ورود با رمز عبور</Link> : null}
                        </> : <Loading />}
                    </div>
                </section>
            </main >
        </>
    );
};

export default Verify;

