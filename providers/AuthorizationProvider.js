import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { Functions } from './FunctionsProvider';


export const Authorization = createContext()

const AuthorizationProvider = ({ children }) => {
    const [tokens, setToken] = useState(() => Cookies.get('token') ? JSON.parse(Cookies.get('token')) : null)
    const [user, setUser] = useState({})
    const { SwalStyled } = useContext(Functions)
    const router = useRouter()

    const getUserInformation = async (token) => {
        const data = await axios.get('/profile/information',
            { headers: { Authorization: `${token.token_type} ${token.access_token}` } })
            .then(({ data }) => {
                setUser(data.data)
                return data.data
            })
            .catch(err => {
                SwalStyled.fire('پیدا نشد', 'اطلاعات کاربر پیدا نشد', 'error')
                logOut()
            })
        return data
    }

    useEffect(() => {
        if (tokens) getUserInformation(tokens)
    }, [tokens])



    const setTokens = async (data) => {
        Cookies.set('token', JSON.stringify(data), { expires: 366 })
        setToken(data)
        getUserInformation(data)
    }

    const logOut = () => {
        router.push('/')
        setToken(null)
        setUser({})
        Cookies.remove('token')
    }

    const contextData = {
        tokens,
        user,
        logOut,
        setTokens,
        getUserInformation
    }

    return (
        <>
            <Authorization.Provider value={contextData}>
                {children}
            </Authorization.Provider>
        </>
    );
};

export default AuthorizationProvider;