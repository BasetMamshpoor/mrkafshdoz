import { useRef, useState } from 'react';
import style from './Password.module.css'
import Link from 'next/link';
import axios from 'axios';
import PasswordValidation from 'Functions/PasswordValidation'
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const ChangePassword = ({ Swal, token, mobile, setIsOpen }) => {
    const [state, setState] = useState({ old_password: '', password: '', password_confirmation: '' })
    const input1 = useRef({})
    const input2 = useRef({})
    const input3 = useRef({})

    const { isMatch } = PasswordValidation(state.password, state.password_confirmation)

    const handlePassword = async (e) => {
        e.preventDefault()
        await axios.post('/user/change-password', state, {
            headers: { Authorization: `${token?.token_type} ${token?.access_token}` }
        })
            .then(res => {
                Swal.fire('انجام شد', res.data.message, 'success')
                setIsOpen(false)
            })
            .catch(err => {
                Swal.fire('انجام نشد', err.response.data.message, 'error')
            })
    }

    const handleChange = e => {
        const { value, name } = e.target
        setState(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const toggleShow = (e, ref) => {
        const type = ref.current.type
        if (type === 'password') {
            ref.current.type = 'text'
            e.currentTarget.children[0].style.display = 'none'
            e.currentTarget.children[1].style.display = 'flex'
        }
        else {
            ref.current.type = 'password'
            e.currentTarget.children[0].style.display = 'flex'
            e.currentTarget.children[1].style.display = 'none'
        }
    }
    return (
        <>
            <div className={style.password}>
                <div className={style.title}>تغییر رمز عبور</div>
                <div className={style.label}>تغییر رمز عبور با استفاده از رمز عبور فعلی</div>
                <form method="post" className={style.form} onSubmit={handlePassword}>
                    <div className={style.inputField}>
                        <input ref={input1} type="password" name='old_password' className={style.input}
                            value={state.old_password} onChange={handleChange} placeholder='رمز عبور فعلی' />
                        <div className={style.eye} onClick={(e) => toggleShow(e, input1)}>
                            <span><IoEyeOutline /></span>
                            <span style={{ display: 'none' }}><IoEyeOffOutline /></span>
                        </div>
                    </div>
                    <div className={style.inputField}>
                        <input ref={input2} type="password" name='password'
                            onCopy={e => e.preventDefault()} onCut={e => e.preventDefault()} className={style.input}
                            value={state.password} onChange={handleChange} placeholder='رمز عبور جدید' />
                        <div className={style.eye} onClick={(e) => toggleShow(e, input2)}>
                            <span><IoEyeOutline /></span>
                            <span style={{ display: 'none' }}><IoEyeOffOutline /></span>
                        </div>
                    </div>
                    <div className={style.inputField}>
                        <input ref={input3} type="password" name='password_confirmation' className={style.input}
                            value={state.password_confirmation} onChange={handleChange}
                            onCopy={e => e.preventDefault()} onCut={e => e.preventDefault()} placeholder='تکرار رمز عبور' />
                        <div className={style.eye} onClick={(e) => toggleShow(e, input3)}>
                            <span><IoEyeOutline /></span>
                            <span style={{ display: 'none' }}><IoEyeOffOutline /></span>
                        </div>
                    </div>
                    <div className={style.rules}>
                        <ul className={style.ruleList}>
                            <li className={style.rule}>
                                {isMatch ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
                                <p className={style.ruleMessage}>حداقل 6 کارکتر</p>
                            </li>
                        </ul>
                    </div>
                    <button disabled={!isMatch ? true : false} className={`${style.btn} ${!isMatch ? style.disableButton : ''}`}>بررسی</button>
                </form>
                <div className={style.forgot_link}>
                    <Link href={`/auth/verify?mobile=${mobile}&forword=/auth/forgotpassword`}>فراموشی رمز یا ایجاد اولین رمز عبور</Link>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;