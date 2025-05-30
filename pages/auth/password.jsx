import { useRouter } from 'next/router';
import style from 'styles/Login.module.css'
import Link from 'next/link';
import { useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { Functions } from 'providers/FunctionsProvider';
import { Authorization } from 'providers/AuthorizationProvider';

const Password = () => {
    const Error = useRef()
    const { query, push } = useRouter()
    const { SwalStyled } = useContext(Functions)
    const { setTokens } = useContext(Authorization)
    useEffect(() => {
        if (!query.mobile)
            push('/auth/login')
    }, [])


    const handleSubmit = async (event) => {
        event.preventDefault()
        const value = event.target[0].value
        if (!value.trim()) {
            Error.current.innerText = 'کادر بالا نباید خالی باشد.'
        } else {
            Error.current.innerText = ''
            const data = {
                grant_type: 'password',
                mobile: query.mobile,
                password: value
            }
            await axios.post(`/login`, data)
                .then(async ({ data }) => {
                    setTokens(data)
                    SwalStyled.fire({
                        title: 'وارد شدید',
                        text: 'با موفقیت وارد حساب کاربری شدید',
                        icon: 'success',
                        willClose: () => push(`/`)
                    })
                })
                .catch(err => SwalStyled.fire('', '.رمز عبور وارد شده اشتباه است', 'error'))
        }
    }

    return (
        <>
            <main className={style.main}>
                <section className={style.card}>
                    <div className={style.login}>
                        <div className={style.logo}>
                            <Link href='/'>
                                <img src='/Images/logo.png' alt="" className='w-full h-full object-contain' />
                            </Link>
                        </div>
                        <h1 className={style.title}>رمز عبور</h1>
                        <div className={style.info}>
                            لطفا رمز عبور خود را وارد کنید
                        </div>
                        <form className={style.form} onSubmit={handleSubmit}>
                            <div className={style.input_sec}>
                                <input type="password" className='!font-serif' name='password' required />
                            </div>
                            <span className={style.error} ref={Error}></span>
                            <button className={style.btn}>ورود</button>
                            <Link href={{
                                pathname: '/auth/verify',
                                query: { mobile: query.mobile }
                            }}>ورود با رمز یکبار مصرف</Link>
                        </form>
                    </div>
                </section>
            </main >
        </>
    );
};

export default Password;