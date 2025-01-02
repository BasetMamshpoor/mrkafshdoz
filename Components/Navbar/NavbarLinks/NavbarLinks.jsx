import { useContext, useState } from 'react';
import style from './NavbarLinks.module.css'
import { RxHamburgerMenu } from 'react-icons/rx'
import Category from '../Category';
import Link from 'next/link';
import { Categories } from 'providers/CategoriesProvider';
import { BsSearch } from 'react-icons/bs';

const NavbarLinks = () => {
    const [flow, setFlow] = useState(false)
    const { categories } = useContext(Categories)



    return (
        <>
            <section className={`${style.navBar} relative`} >
                <div className='container'>
                    <nav className='flex items-center justify-between w-full gap-3'>
                        <div className={style.kBud}>
                            <div className={style.category} style={{ paddingRight: flow ? '8px' : '0px' }}>
                                <div href={`/category-${categories[0].slug}-apparel`} className={`${style.categoryBurger} ${flow ? style.hover : ''}`} onMouseEnter={() => setFlow(true)} onMouseLeave={() => setFlow(false)}>
                                    <span>
                                        <RxHamburgerMenu />
                                    </span>
                                    <p>دسته بندی</p>
                                </div>
                                <Category flow={flow} setFlow={setFlow} />
                            </div>
                            <span className={style.border}></span>
                            <div className={style.navBarLinks}>
                                <ul className={style.eopfu}>
                                    <li><Link href="/">خانه</Link></li>
                                    <li><Link href={`/category-${categories[0].slug}-apparel?sort=bestselling`}>پرفروش&zwnj;ترین&zwnj;ها</Link></li>
                                    <li><Link href={`/category-${categories[0].slug}-apparel?discount=true`}>تخفیف&zwnj;ها و پیشنهادات</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className={`${style.navSearch} d-flex`}>
                            <form className={style.searchForm}>
                                <BsSearch />
                                <input type="text" placeholder="جستجو کنید ..." />
                            </form>
                        </div>
                    </nav>
                </div>
            </section >
        </>
    );
};

export default NavbarLinks;
