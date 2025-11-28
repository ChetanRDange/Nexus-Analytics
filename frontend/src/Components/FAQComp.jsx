import React, { useState } from "react";
import Minus from "../assets/svgs/settings/minus.svg";
import Plus from "../assets/svgs/settings/plus.svg";

const faqs = [
  {
    question:
      "We need to add new users to our Workspace. How will that be billed?",
    answer:
      "When you add new users to your workspace, billing is based on the number of users and the plan you have selected. Additional users will be charged according to your current plan’s rate.",
  },
  {
    question:
      "Can I upgrade ClickUp just for myself, instead of upgrading everyone in our Workspace?",
    answer:
      "Yes, you can upgrade ClickUp for yourself individually without upgrading the entire workspace. However, you may miss out on certain collaboration features that require all team members to be on the same plan.",
  },
  {
    question: "What happens if I change my mind?",
    answer:
      "If you change your mind, you can downgrade or cancel your plan at any time. Depending on the timing, you might be eligible for a refund for unused services.",
  },
  {
    question: "My Workspace has credits. How do we use them?",
    answer:
      "If your workspace has credits, they can be applied to your next billing cycle. Simply select the credit option during the payment process, and the credits will be deducted from your balance.",
  },
];

const FAQComp = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-10 mb-28">
      <h2 className="w-full text-2xl sm:text-3xl md:text-4xl font-semibold text-title mb-3">
        Pricing FAQ
      </h2>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`${
            openIndex === index ? "bg-gray-50 rounded-xl mt-2" : ""
          }`}
          style={{
            borderBottom: openIndex === index ? "none" : "1px solid #ccc",
          }}
        >
          <div className="p-5">
            <button className="flex justify-between w-full text-left px-6 py-4 border-b border-transparent"
              onClick={() => toggleAccordion(index)}
              style={{
                padding: "24px 0px 14px 0px",
                border: "none",
                cursor: "pointer",
                width: "100%",
                boxSizing: "border-box",
              }}
             id="button-49">
              <h3 className="text-lg font-medium">{faq.question}</h3>
              <span className="text-lg">
                {openIndex === index ? (
                  <img src={Minus} alt="close" />
                ) : (
                  <img src={Plus} alt="open" />
                )}
              </span>
            </button>
            {openIndex === index && (
              <div className="pt-3 w-3/5">
                <p className="text-primary font-normal">{faq.answer}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQComp;
