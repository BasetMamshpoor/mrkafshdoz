import axios from "axios"
import Footer from "Components/Footer/Footer"
import Navbar from "Components/Navbar"
import CartContextProvider from "providers/CartContextProvider"
import 'styles/globals.css'
import NextNProgress from 'Components/Progress/index'
import useMediaQuery from "hooks/useMediaQuery"
import MobileNavbar from "Components/Navbar/MobileNavbar"
import FunctionsProvider from "providers/FunctionsProvider"
import CategoriesProvider from "providers/CategoriesProvider"
import {useRouter} from "next/router"
import Head from "next/head"
import AuthorizationProvider from "providers/AuthorizationProvider"
import {HeroUIProvider} from "@heroui/react"

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`

export const metadata = {
    title: "آقای کفشدوز | خرید کفش مردانه با بهترین قیمت و ارسال سریع",
    description: "از تولید به مصرف",
    verification: {
        google: "6mjeZ7kyFvTxiiwPJyX47W0w438CgTECiBH_FYnm4fY",
    },
};

export default function App({Component, pageProps}) {
    const isMatch = useMediaQuery('(max-width: 1023.98px)')
    const router = useRouter()
    const routesWithout_nav_foot = ['/auth/login', '/auth/password', '/auth/verify', '/auth/forgotpassword', '/checkout/payment']
    const withoutNavbar_Footer = routesWithout_nav_foot.find(r => r === router.pathname) ? true : false;

    return (
        <HeroUIProvider navigate={router.push}>
            <FunctionsProvider>
                <CategoriesProvider>
                    <AuthorizationProvider>
                        <CartContextProvider>
                            <Head>
                                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                                <link rel="icon" href="./favicon.ico" sizes="any"/>
                                <link rel="canonical" href="https://mrkafshdoz.com/"/>
                            </Head>
                            {!withoutNavbar_Footer && (isMatch ? <MobileNavbar/> : <Navbar/>)}
                            <NextNProgress/>
                            <Component {...pageProps} />
                            {!withoutNavbar_Footer && <Footer/>}
                            <div id="modal-container"></div>
                        </CartContextProvider>
                    </AuthorizationProvider>
                </CategoriesProvider>
            </FunctionsProvider>
        </HeroUIProvider>
    )
}
