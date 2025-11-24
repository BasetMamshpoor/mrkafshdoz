import About from "Components/Main/About";
import Banner from "Components/Main/Banner";
import FaqSection from "Components/Main/FaqQuestions";
import MostSell from "Components/Main/MostSell";
import TwoBanners from "Components/Main/TwoBanners";
import DailyOffer from "Components/Slider/DailyOffer";
import Slider from "Components/Slider/Slider";
import axios from "axios";
import Stories from "../Components/Stories/Stories";

export default function Home({initialData}) {
    return (
        <>
            <main>
                <Stories data={initialData?.story}/>

                <Slider data={initialData?.sliders}/>

                <Banner data={initialData?.banners}/>

                {!!initialData?.discounts.length && <DailyOffer data={initialData?.discounts}/>}

                <MostSell
                    title="پرفروش ترین ها"
                    url="bestselling"
                    data={initialData?.top_orders}
                />

                <TwoBanners data={initialData?.banners1}/>

                <MostSell
                    title="جدید ترین ها"
                    url="newest"
                    data={initialData?.newest}
                />

                <FaqSection/>

                <About/>
            </main>
        </>
    );
}

export async function getServerSideProps() {
    try {
        const response = await axios.get('/main');
        const data = response.data;
        return {
            props: {initialData: data},
        };
    } catch {
        return {
            props: {initialData: null},
        };
    }
}