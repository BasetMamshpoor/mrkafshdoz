import decodeQueryData from 'Functions/decodeQueryData'
import axios from 'axios'

export const getProducts = async (categoryId, queries, page = 1) => {

    const data = await axios.get(`/products/filter/${categoryId}?${decodeQueryData(queries)}`, { params: { page } })
        .then(res => res.data)
        .catch(err => console.log(err))

    return data
}
export const getAllProducts = async (queries, page = 1, isWholeSale) => {
    const { category, ...query } = queries    
    const data = await axios.get(`/products${(isWholeSale ? '/major' : '') + (category ? `/filter/${category}` : '')}`, { params: { page, ...query } })
        .then(res => res.data)
        .catch(err => console.log(err))

    return data
}
export const getAllProductsSearch = async (queries, page = 1) => {
    const { text, ...query } = queries
    const data = await axios.get(`/search?query=${text}`, { params: { page, ...query } })
        .then(res => res.data)
        .catch(err => console.log(err))

    return data
}
