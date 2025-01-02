import React, { useRef } from 'react';
import style from 'styles/Login.module.css'
import Logo from '../../public/Images/logo-no-background-transformed.png'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
const Login = () => {
    const Error = useRef()
    const { push } = useRouter()

    const handleSubmit = async event => {
        event.preventDefault()
        const value = event.target[0].value
        const regex = /^09\d{9}$/;
        const isValid = regex.test(value);
        if (!isValid) {
            Error.current.innerText = 'شماره موبایل معتبر نیست.'
        } else {
            Error.current.innerText = ''
            await axios.post(`/auth/check-email`, { mobile: value })
                .then(({ data }) => {
                    if (data.registered)
                        push({
                            pathname: '/auth/password',
                            query: { mobile: value }
                        })
                    else
                        push({
                            pathname: '/auth/verify',
                            query: { mobile: value }
                        })
                })
                .catch(err => Error.current.innerText = 'با عرض پوزش مشکلی به وجود آمده')
        }
    }
    return (
        <>
            <main className={style.main}>
                <section className={style.card}>
                    <div className={style.login}>
                        <div className={style.logo}>
                            <Link href='/'>
                                <img src={Logo.src} alt="" />
                            </Link>
                        </div>
                        <h1 className={style.title}>ورود | ثبت‌نام</h1>
                        <div className={style.info}>
                            لطفا شماره موبایل خود را وارد کنید
                        </div>
                        <form className={style.form} onSubmit={handleSubmit}>
                            <div className={style.input_sec}>
                                <input type="tel"  required />
                            </div>
                            <span className={style.error} ref={Error}></span>
                            <button className={style.btn}>بررسی</button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Login;