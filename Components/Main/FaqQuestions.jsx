import { Accordion, AccordionItem } from "@heroui/accordion";
import Image from "next/image";

export default function FaqSection() {
  const faqItems = [
    {
      id: 1,
      name: "سایز دقیقم چطوری پیدا کنم؟",
      value: "انتهای پاشنه تا انتهایی انگشت پا را با متر اندازه گیری کنید اندازه به دست آمده را با جدول زیر مطابقت بدهید."
    },
    {
      id: 3,
      name: "خریده عمده رو چطور انجام بدم؟",
      value: "به بخش اکسپلور رفته در کادر بالا سمت چپ عمده را انتخاب نموده کفش مدنظرتون + رنگ مدنظرتون انتخاب نموده و درخواست تماس را زده تیم پشتیبانی ما در کوتاه ترین زمان ممکن تماس گرفت و ثبت سفارش شمارو انجام داده"
    },
    {
      id: 4,
      name: "مراحل ارسال به چه شکل؟",
      value: "بسته شما بعد از ثبت سفارش وارد مرحله آماده سازی و بسته بندی میشه ۱ الی ۲ روز کاری زمان بره سپس تحویل اداره پست داده شده و طی ۳ الی ۴ روز کاری به دست شما میرسه"
    }
  ];

  return (
    <section className="container w-full my-12" dir='rtl'>
      <Accordion>
        {faqItems.map((item, i) => (
          <AccordionItem
            className="[&>h2>button>div>span]:font-bold"
            key={item.id}
            aria-label={`Accordion ${item.id}`}
            title={item.name}
          >
            {item.value}
            {i === 0 && <Image src='/Images/tabel.jpg' unoptimized={true} width={100} height={100} className="max-w-[360px] mx-auto mt-4" />}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
