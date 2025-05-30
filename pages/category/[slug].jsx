import axios from 'axios';
import SelectCategoryType from 'Components/Categories/SelectCategoryType';
import { getAllRouteCategories } from 'lib/getStaticPaths';
import ProductList from 'Components/Categories/ProductList';

const Type = ({ data }) => {
    if (!data) {
        return <div>داده‌ای برای نمایش وجود ندارد</div>;
    }

    return (
        <>
            {!!data && <main>
                {data.subCategories.length ?
                    <SelectCategoryType subCategories={data.subCategories} /> :
                    null}
                <ProductList id={data.id} />
            </main>}
        </>
    );
};

export async function getStaticPaths() {
    const paths = await getAllRouteCategories();

    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params }) {
    const { slug } = params;

    try {
        const response = await axios.get(`/categories/${slug}`);
        const { data } = response.data;

        if (!data) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                data,
            },
            revalidate: 60,
        };

    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            notFound: true,
        };
    }
}


export default Type;