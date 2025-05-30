import axios from 'axios';
import { useRef, useState } from 'react';
import style from './AddComment.module.css'
import Cookies from 'js-cookie';
import { Slider } from "@heroui/react";

const AddComment = ({ state, id, SwalStyled, push, setIsOpen }) => {
    const parent = useRef()
    const [data, setData] = useState(!!state ? state : { product_id: id, text: '', rate: 3, is_anonymous: 0 })
    const token = Cookies.get('token') ? JSON.parse(Cookies.get('token')) : null
    const headers = { Authorization: `${token?.token_type} ${token?.access_token}` }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!token)
            SwalStyled.fire({
                title: 'ایراد در شناسایی',
                text: 'لطفا ابتدا وارد حساب کاربری شوید',
                icon: 'warning',
                showCancelButton: true,
                cancleButtonText: '',
                confirmButtonText: 'ورود',
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                willClose: () => setIsOpen(false)
            }).then((result) => {
                if (result.isConfirmed) push('/auth/login')
            })
        else
            if (!!state) {
                const { product, ...comment } = data
                await axios.put(`/profile/comments/${state.id}`, comment, { headers })
                    .then((res) => {
                        SwalStyled.fire('ویرایش شد', res.data.message, 'success')
                        setIsOpen(false)
                    })
                    .catch(err => SwalStyled.fire('مشکلی وجود دارد.', err.response.data.message, 'error'))

            } else
                await axios.post('/comment', data, { headers })
                    .then((res) => {
                        SwalStyled.fire('ثبت شد', res.data.message, 'success')
                        setIsOpen(false)
                    })
                    .catch(err => SwalStyled.fire('مشکلی وجود دارد.', err.response.data.message, 'error'))
    }
    return (
        <>
            <div className={style.spOil8} dir='rtl' ref={parent}>
                <header className={style.Exolap}>
                    <p className={style.yxewQ}>دیدگاه خود را در مورد این محصول وارد کنید.</p>
                </header>
                <form onSubmit={handleSubmit}>
                    <content className={style.gtDComm}>
                        <Slider
                            classNames={{ mark: 'text-[12px]', track: 'border-x-0', base: 'px-4' }}
                            color={data.rate == 4 ? 'primary' : data.rate == 3 ? 'warning' : 'success'}
                            maxValue={5}
                            minValue={3}
                            value={data.rate}
                            onChange={(e) => setData(prev => { return { ...prev, rate: e } })}
                            showSteps={true}
                            size="sm"
                            step={1}
                            marks={[
                                {
                                    value: 3,
                                    label: "معمولی",
                                },
                                {
                                    value: 4,
                                    label: "خوب",
                                },
                                {
                                    value: 5,
                                    label: "عالی",
                                },
                            ]}
                        />
                        <div className={style.VqoJu}>
                            <label className={style.e3Xipy}>متن نظر!<span className={style.requierd}>*</span></label>
                            <textarea defaultValue={state?.text} minLength={5} required className={style.TciBol} onChange={({ target }) => setData(prev => { return { ...prev, text: target.value } })} placeholder="این محصول ..."></textarea>
                        </div>
                        <div className={style.Oibt0s}>
                            <input className={style.form_check_input} type="checkbox" onChange={() => setData(prev => { return { ...prev, is_anonymous: prev.is_anonymous ? 0 : 1 } })}
                                id="anonymousComment" checked={data.is_anonymous ? true : false} />
                            <label htmlFor="anonymousComment" className={style.WcMql}>ارسال به صورت
                                ناشناس</label>
                        </div>
                    </content>
                    <footer className={style.PohtI9}>
                        <button className={style.Opibt}>ثبت دیدگاه</button>
                        <label className={style.iOnht}>ثبت دیدگاه به معنی قبول
                            <a href="."> قوانین ما </a>
                            است.</label>
                    </footer>
                </form>
            </div>
        </>
    );
};

export default AddComment;