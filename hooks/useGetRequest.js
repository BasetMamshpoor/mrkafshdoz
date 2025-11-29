import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetRequest = (url, page = 1, obj) => {
    const [data, setData] = useState();
    const [paginations, setPaginations] = useState();
    const [reload, setReload] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const get = async () => {
            if (url) {
                setLoading(true);
                await axios.get(url, { params: { ...obj, page } })
                    .then(res => {
                        const { data, ...pagination } = res.data;
                        setData(data);
                        setPaginations(pagination);
                    })
                    .catch(err => console.log(err))
                    .finally(() => setLoading(false));
            }
        };
        get();
    }, [url, reload, page]);

    return [data, setData, setReload, paginations, setPaginations, loading];
};

export default useGetRequest;