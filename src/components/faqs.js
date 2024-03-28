"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "@/styles/globals.css";
const faqs = [
  {
    question: "Is there a demo that I can try?",
    answer:
      "Yes, you can go and try out the demo. The demo bot you see is trained on the sitegpt.ai website content itself. So you can ask any questions related to the website in that demo bot and it will answer it.",
  },
  {
    question: "How do I train the chatbot?",
    answer:
      "You can train the chatbot by adding a website link, a sitemap link, or a Gitbook link. Just enter a URL, and the chatbot will be trained on all the content present on that URL.",
  },
  {
    question: "How long does the training take?",
    answer:
      "It depends on the number of pages you are training, but usually, it should be done within a few minutes.",
  },
  {
    question: "What type of content can we use to train the chatbot?",
    answer:
      "You can use any type of content to train the chatbot. The more content you provide, the better the chatbot will be able to answer the questions.",
  },
  {
    question: "Can you embed a chatbot on multiple websites?",
    answer:
      "Yes, you're able to add any chatbot to any number of sites that you want visitors to interact with.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FAQ_E() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently asked questions
          </h2>
          <Accordion>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}