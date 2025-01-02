import { useContext, useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Titel from "../DetailPaint/titel";
import { AxiosPublic } from '../../config/axios';
import { Authorization } from '../../providers/AuthContextProvider';
import { CartContext } from '../../providers/CartContextProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Password = ({ user, setVerifyCom }) => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState();

    const { getTokens } = useContext(Authorization)
    const { state, dispatch } = useContext(CartContext)


    const push = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null)
        setLoading(true)
        await AxiosPublic.post("login", { user, password })
            .then(async res => {
                const { token, ...prev } = res.data.data
                getTokens(token)
                await axios.post('shopping-cart/store', state,
                    { headers: { Authorization: `${token.token_type} ${token.access_token}` } })
                    .then(res => dispatch({ type: "UPDATE_CART", payload: res.data.data }))
                    .catch(err => alert(err.response?.data.message))
                await push(`/${prev.is_admin ? 'admin' : 'profile'}/information`)
            })
            .catch(err => setError(err.response?.data.message || 'رمز عبور اشتباه است'))
            .finally(() => setLoading())
    };

    return (
        <div className="max-w-md w-full flex flex-col">
            <div className='bg-white rounded-b-lg p-8'>
                <Titel title='ورود با رمز عبور' />
                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                    <div className='flex flex-col gap-4'>
                        <label htmlFor="password" className="block font-medium text-gray-700">
                            رمز عبور
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#C3003F] focus:border-[#C3003F] sm:text-sm"
                            required
                        />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <button disabled={loading} type="submit" className={`text-white centerOfParent h-12 w-full bg-gradient-to-r from-[#C3003F]  to-[#5D001E] hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-lg px-5 py-2.5 text-center`}>
                        {loading ?
                            <div role="status">
                                <AiOutlineLoading3Quarters className='className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white' />
                                <span className="sr-only">Loading...</span>
                            </div>
                            : 'ورود'}
                    </button>
                    <p onClick={() => setVerifyCom(1)} className='text-sm text-blue-500 cursor-pointer'>رمز عبور خود را فراموش کرده ام!</p>
                </form>
            </div>
        </div>
    );
};

export default Password;
