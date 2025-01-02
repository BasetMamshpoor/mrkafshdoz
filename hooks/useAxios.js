import axios from 'axios'
import { Authorization } from 'providers/AuthorizationProvider'
import { useContext } from 'react'


const baseURL = "https://api.mrkafshdoz.com/api/"


const useAxios = () => {
    const { tokens } = useContext(Authorization)


    const AxiosPrivate = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
            Authorization: `${tokens?.token_type} ${tokens?.access_token}`
        }
    });
    const AxiosPublic = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    return { AxiosPrivate, AxiosPublic }
}

export default useAxios;