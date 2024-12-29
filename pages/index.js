import Banner from "Components/Main/Banner";
import MostSell from "Components/Main/MostSell";
import TwoBanners from "Components/Main/TwoBanners";
import DailyOffer from "Components/Slider/DailyOffer";
import Slider from "Components/Slider/Slider";

export default function Home() {
  return (
    <>
      <main>
        <Slider />

        <Banner />

        <DailyOffer />

        <MostSell />

        <TwoBanners />
      </main>
    </>
  )
}
