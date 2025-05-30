import Loading from 'Components/Loading';
import useGetRequest from 'hooks/useGetRequest';
import React, { createContext } from 'react';

export const Categories = createContext()

const CategoriesProvider = ({ children }) => {
    const [categories=[], setCategories, reload,,,isLoading] = useGetRequest('/categories')
    return (
        <>
            <Categories.Provider value={{ categories, setCategories, reload }}>
                {!isLoading ? children : <Loading />}
            </Categories.Provider>
        </>
    );
};

export default CategoriesProvider;