import ProductList from "Components/Categories/ProductList";
import SelectCategory from "Components/Categories/SelectCategory";
import SelectGender from "Components/Categories/SelectGender";
import { getCategories } from "api/categories";
import { useRouter } from "next/router";

const Apparel = ({ category }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <>
            {category ? (
                <>
                    <SelectGender slug={category.slug} />
                    <SelectCategory categories={category.subCategories} />
                    <ProductList id={category.id} />
                </>
            ) : (
                <p>دسته‌بندی مورد نظر یافت نشد.</p>
            )}
        </>
    );
};

export async function getStaticPaths() {
    const categories = await getCategories();
    const paths = categories.map(c => ({ params: { slug: c.slug } }));

    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params }) {
    const categories = await getCategories();
    const category = categories.find(c => c.slug === params.slug) || null;

    if (!category) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            category,
        },
        revalidate: 60,
    };
}

export default Apparel;
