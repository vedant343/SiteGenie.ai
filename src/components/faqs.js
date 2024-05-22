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
      "Yes, youre able to add any chatbot to any number of sites that you want visitors to interact with.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FAQ_E() {
  return (
    <section class="py-15">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-8">
          <h2 class="text-5xl text-center text-gray-900 leading-[3.25rem]">
            Frequently asked questions
          </h2>
          {/* <div className="text-lg mb-4 py-4 text-center text-gray-600">
            <p>
              Here are a few of the questions we get the most. If you dont see
              whats on your mind, reach out to us anytime on phone, chat, or
              email.
            </p>
          </div> */}
        </div>
        <div class="accordion-group" data-accordion="default-accordion">
          <div class="accordion " id="basic-heading-one-with-icon">
            <button
              class="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-4xl transition duration-500 hover:text-indigo-600 accordion-active:font-medium accordion-active:text-indigo-600"
              aria-controls="basic-collapse-one-with-icon"
            ></button>
            <Accordion>
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-solid border-gray-300 px-5 py-2 rounded-xl transition duration-500 accordion-active:bg-indigo-50 accordion-active:border-indigo-600 mb-6 active"
                >
                  <AccordionTrigger className="text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-gray-500">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

{
  /* // <div class="bg-white">
// <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
//   <div class="lg:grid lg:grid-cols-3 lg:gap-8">
//     <div>
//     <h2 */
}
{
  /* //       class="text-4xl font-manrope text-center font-bold text-gray-900 leading-[3.25rem]"
//     >
//       Frequently asked questions
//     </h2> */
}
//       <p class="mt-4 text-lg text-gray-500">
//         Can’t find the answer you’re looking for? Reach out to our{" "}
//         <a
//           href="#"
//           class="font-medium text-indigo-600 hover:text-indigo-500"
//         >
//           customer support
//         </a>{" "}
//         team.
//       </p>
//     </div>
//     <div class="mt-12 lg:mt-0 lg:col-span-2">
//       <dl class="space-y-12">
//         <Accordion>
//           {faqs.map((faq, index) => (
//             <AccordionItem key={index} value={`item-${index}`}>
//               <AccordionTrigger>{faq.question}</AccordionTrigger>
//               <AccordionContent>{faq.answer}</AccordionContent>
//             </AccordionItem>
//           ))}
//         </Accordion>
//       </dl>
//     </div>
//   </div>
// </div>
// </div>

// <svg
//                 class="w-6 h-6 text-gray-900 transition duration-500 block accordion-active:text-indigo-600 accordion-active:hidden group-hover:text-indigo-600 origin-center"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M6 12H18M12 18V6"
//                   stroke="currentColor"
//                   stroke-width="1.6"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 ></path>
//               </svg>
//               <svg
//                 class="w-6 h-6 text-gray-900 transition duration-500 hidden accordion-active:text-indigo-600 accordion-active:block group-hover:text-indigo-600"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M6 12H18"
//                   stroke="currentColor"
//                   stroke-width="1.6"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 ></path>
//               </svg>
//             </button>
