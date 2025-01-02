import { Accordion, AccordionItem } from "@nextui-org/accordion";

export default function FaqSection({ faq }) {
  const faqItems = [
    {
      id: 1,
      name: "سوال",
      value: "جواب"
    },
    {
      id: 3,
      name: "سوال",
      value: "جواب"
    },
    {
      id: 4,
      name: "سوال",
      value: "جواب"
    },
    {
      id: 5,
      name: "سوال",
      value: "جواب"
    },
    {
      id: 6,
      name: "سوال",
      value: "جواب"
    },
  ];

  return (
    <section className="container w-full my-12" dir='rtl'>
      <Accordion>
        {(faq || faqItems).map((item) => (
          <AccordionItem
            className="[&>h2>button>div>span]:font-bold"
            key={item.id}
            aria-label={`Accordion ${item.id}`}
            title={item.name}
          >
            {item.value}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
