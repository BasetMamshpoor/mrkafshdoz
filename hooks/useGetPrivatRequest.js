import axios from 'axios';
import {useRouter} from 'next/router';
import {Authorization} from 'providers/AuthorizationProvider';
import {Functions} from 'providers/FunctionsProvider';
import {useContext, useEffect, useState} from 'react';

const useGetPrivateRequest = (url, page = 1, obj) => {
    const router = useRouter()
    const [data, setData] = useState()
    const [paginations, setPaginations] = useState()
    const [reload, setReload] = useState(Math.random())
    const [loading, setLoading] = useState(false)
    const {tokens} = useContext(Authorization)
    const {SwalStyled} = useContext(Functions)

    useEffect(() => {
        setLoading(true)
        if (tokens) {
            const get = async () => {
                await axios.get(url, {
                    params: {...obj, page},
                    headers: {Authorization: `${tokens.token_type} ${tokens.access_token}`}
                })
                    .then(res => {
                        const {data, ...pagination} = res.data
                        setData(res.data.data)
                        setPaginations(pagination)
                    })
                    .catch(err => {
                        SwalStyled.fire({
                            title: 'ایراد در سرور',
                            text: 'مشکلی به وجود آمده لطفا با پشتیبانی تماس بگیرید',
                            icon: 'error',
                            willClose: () => router.back()
                        })
                    }).finally(() => setLoading(false))
            }
            get()
        } else {
            const get = async () => {
                await axios.get(url, {params: {...obj, page}})
                    .then(res => {
                        const {data, ...pagination} = res.data
                        setData(res.data.data)
                        setPaginations(pagination)
                    })
                    .catch(err => {
                        SwalStyled.fire({
                            title: 'توکن منقضی شده است',
                            text: '.لطفا دوباره وارد حساب کربری خود شوید',
                            icon: 'warning',
                            willClose: () => router.push("/auth/login"),
                        })
                    }).finally(() => setLoading(false))
            }
            get()
        }
    }, [tokens, url, reload, page])

    return [data, setData, setReload, paginations, setPaginations, loading]
};

export default useGetPrivateRequest;

