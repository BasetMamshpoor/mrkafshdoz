import { Button } from "@heroui/react";
import useAxios from "hooks/useAxios";
import { useEffect, useState } from "react";

const Shipping = () => {
    const { AxiosPrivate } = useAxios()
    const [price, setPrice] = useState({})
    const [loading, setLoading] = useState()

    useEffect(() => {
        const get = async () => {
            await AxiosPrivate.get('/shipping-cost')
                .then(res => setPrice(res.data))
                .catch(err => alert(err.response?.data.message))
        }
        get()
    }, [])

    const handleChange = ({ target }) => {
        const { name, value } = target
        setPrice(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await AxiosPrivate.put('/shipping-cost/update', price)
            .then(res => alert(res.data.message))
            .catch(err => alert(err.response?.data.message))
            .finally(() => setLoading(false))
    }

    return (
        <>
            <div className="p-2">
                <form className="flex gap-6 flex-col items-start" onSubmit={handleSubmit}>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <input type="number" id="1" name="cost" defaultValue={price.cost} onChange={handleChange}
                                    className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 peer`} placeholder="" />
                                <label htmlFor='1' className={`absolute text-nowrap rounded-lg text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}>کل ایران</label>
                            </div>
                            <span>تومان</span>
                        </div>
                    </div>
                    <Button type="submit" disabled={loading} color="primary">ویرایش</Button>
                </form>
            </div>
        </>
    );
};

export default Shipping;