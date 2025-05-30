import React, {useRef, useState} from 'react';
import style from 'styles/Login.module.css'
import Link from 'next/link';
import axios from 'axios';
import {useRouter} from 'next/router';

const Login = () => {
    const Error = useRef()
    const {push} = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async event => {
        event.preventDefault()
        const value = event.target[0].value
        const regex = /^09\d{9}$/;
        const isValid = regex.test(value);
        if (!isValid) {
            Error.current.innerText = 'شماره موبایل معتبر نیست.'
        } else {
            setLoading(true)
            Error.current.innerText = ''
            await axios.post(`/auth/check-email`, {mobile: value})
                .then(({data}) => {
                    if (data.registered)
                        push({
                            pathname: '/auth/password',
                            query: {mobile: value}
                        })
                    else
                        push({
                            pathname: '/auth/verify',
                            query: {mobile: value}
                        })
                })
                .catch(err => Error.current.innerText = 'با عرض پوزش مشکلی به وجود آمده')
                .finally(() => setLoading(false))
        }
    }
    return (
        <>
            <main className={style.main}>
                <section className={style.card}>
                    <div className={style.login}>
                        <div className={style.logo}>
                            <Link href='/'>
                                <img src='/Images/logo.png' alt="" className='w-full h-full object-contain'/>
                            </Link>
                        </div>
                        <h1 className={style.title}>ورود | ثبت‌نام</h1>
                        <div className={style.info}>
                            لطفا شماره موبایل خود را وارد کنید
                        </div>
                        <form className={style.form} onSubmit={handleSubmit}>
                            <div className={style.input_sec}>
                                <input type="tel" className='!font-mono' required/>
                            </div>
                            <span className={style.error} ref={Error}></span>
                            <button disabled={loading} className={style.btn}>بررسی</button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Login;