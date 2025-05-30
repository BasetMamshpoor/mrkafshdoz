import React, { useContext, useEffect, useState } from 'react';
import style from './Category.module.css'
import Link from 'next/link';
import Image from 'next/image';
import { Categories } from 'providers/CategoriesProvider';

const Category = ({ flow, setFlow }) => {

    useEffect(() => {
        if (flow) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'auto'
    }, [flow])

    const { categories } = useContext(Categories)

    const [gender, setGender] = useState(categories[0]?.slug)

    const categoryLevel2 = categories.find(c => c.slug === gender)?.subCategories

    const apparelElement = categories.map((item, index) => {
        return <li key={item.id}
            className={`${style.gender_apparel} ${gender === item.slug ? style.apparel_active : ''}`}
            onMouseEnter={() => setGender(item.slug)}>
            <Link href={`/category-${item.slug}-apparel`}>{item.name}</Link></li>
    })


    const apparelTypeElement = categoryLevel2?.map(i => {
        return (
            <article className={style.article} key={i.id}>
                <Link href={`/category-${i.slug}`}>
                    <div className={style.art_img}>
                        <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png'
                            width={0} height={0} sizes='100vw' className='w-full h-full object-cover' src={i?.icon || '/Images/placeholder-1.png'} alt={i.name} /></div>
                    <div className={style.art_name}><span>{i.name}</span></div>
                </Link>
            </article>
        )
    });

    return (
        <>
            <div className={`${style.categorybg} ${flow ? style.show : style.hidden}`} >
                <div className={style.cat_menu}
                    onMouseEnter={() => setFlow(true)} onMouseLeave={() => setFlow(false)}
                >
                    <div className={style.cat_gender_menu}>
                        <div className={style.cat_gender_apparel}>
                            <ul>
                                {apparelElement}
                            </ul>
                        </div>
                        <div className={style.apparel_type}>
                            {apparelTypeElement}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(Category);
