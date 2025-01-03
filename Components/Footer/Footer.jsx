import Link from "next/link";
import { Categories } from "providers/CategoriesProvider";
import { useContext } from "react";
import { FaInstagram, FaTelegram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

export default function FooterSection() {
    const { categories } = useContext(Categories)

    const sections = [
        {
            title: "اطلاعات بیشتر",
            items: [
                { href: "/", text: "خانه" },
                { href: `/profile`, text: "پروفایل" },
                { href: `/checkout/cart`, text: "سبد خرید" },
                ...categories.map(c => ({ href: `/category-${c.slug}-apparel`, text: c.name })),
            ]
        },
    ];

    return (
        <footer className="bg-main  bg-gradient-to-t text-white py-8 pb-20 md:pb-8" dir="ltr">
            <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-8 gap-3 text-xs md:items-start px-4 sm:px-auto">
                <div
                    className="text-gray-300 lg:col-span-2 space-y-2"
                    dir="rtl"
                >
                    <Link href="/" className="lg:w-[260px] lg:h-[126px] w-[130px] h-[63px] overflow-hidden centerOfParent">
                        <img
                            src='/Images/Logo.png'
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto' }} // optional
                            alt="Tonaliteh"
                            className="py-2 object-contain"
                        />
                    </Link>
                    <p className="flex items-center mb-2">آدرس: تهران، خیابان خیام، کوچه مبرا، کوچه همت آباد تعاونی پلاک 3 </p>
                    <a href="tel:09145244708" className="text-gray-300 block">موبایل: 09145244708</a>
                    <p>ایمیل: info@mrkafshdoz.com</p>
                </div>

                {sections.map((section, index) => (
                    <div dir="rtl" key={index}>
                        <span className="text-lg font-bold mb-2">{section.title}</span>

                        <ul className="flex flex-col gap-1 ">
                            {section.items.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        className="text-gray-300 hover:text-gray-100"
                                    >
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div className="col-span-2 md:col-span-1 lg:col-span-2">
                    <div className="centerOfParent space-x-8 text-2xl lg:text-4xl mb-4">
                        <a
                            href="https://t.me/mrkafshdoz"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-gray-100 text-gray-300"
                            aria-label="اینستاگرام"
                        >
                            <FaInstagram />
                        </a>

                        <a
                            href="https://www.instagram.com/mr.kafshdoz/profilecard/?igsh=MXhvbzZtZmthenliOQ=="
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-gray-100 text-gray-300"
                            aria-label="تلگرام"
                        >
                            <FaTelegram />
                        </a>

                        <a
                            href="https://wa.me/09375773947"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-gray-100 text-gray-300"
                            aria-label="لینکدین"
                        >
                            <FaWhatsapp />
                        </a>
                    </div>

                    <div className="flex items-center gap-2 justify-center">
                        <div className="max-w-[120px]">
                            <a referrerpolicy='origin' target='_blank' aria-label="e nemad" href='https://trustseal.enamad.ir/?id=564452&Code=TOD78Uon5jtwJI9A9SjeIw8XRRNSlp9x'>
                                <img
                                    alt=""
                                    id="QCC7fMUobFpELTgyJmeL"
                                    data-lazy-src="https://seenart.ir/wp-content/uploads/2023/10/enamad-logo.png?id=375582&amp;Code=QCC7fMUobFpELTgyJmeL"
                                    className="entered lazyloaded cursor-pointer"
                                    src="https://seenart.ir/wp-content/uploads/2023/10/enamad-logo.png?id=375582&amp;Code=QCC7fMUobFpELTgyJmeL"
                                    data-ll-status="loaded"
                                />
                                <noscript>
                                    <img
                                        className="cursor-pointer"
                                        src="https://seenart.ir/wp-content/uploads/2023/10/enamad-logo.png?id=375582&amp;Code=QCC7fMUobFpELTgyJmeL"
                                        alt=""
                                        id="QCC7fMUobFpELTgyJmeL"
                                    />
                                </noscript>
                            </a>
                        </div>

                        <div>
                            <a href="#" title="درگاه پرداخت امن"
                                aria-label="بیت پی">
                                <img src="https://bitpay.ir/theme/public/images/trusted-logo.svg" alt="درگاه پرداخت بیت پی" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer >
    );
}
