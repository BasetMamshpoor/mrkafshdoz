import Axios from "axios";
import Cookies from 'js-cookie';

export const AxiosPublic = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + '/api',
  headers: {
    "Content-Type": "application/json",
  },
});
export const getToken = () => {
  const token = Cookies.get('token')
  return token ? JSON.parse(token) : null
}

export const AxiosPrivate = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + '/api',
  headers: {
    Accept: "application/json",
    Authorization: `${getToken()?.token_type} ${getToken()?.access_token}`,
  },
});
