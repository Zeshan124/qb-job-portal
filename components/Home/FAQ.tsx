"use client";

import React from "react";
import { Collapse } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const faqs = [
  {
    question: "How does the Job Portal work?",
    answer:
      "Please explore the available job opportunities as per your preferences, submit your application, and our HR team will get in touch with you.",
  },
  {
    question: "Can you explain the company's recruitment process?",
    answer:
      "Our recruitment process involves multiple stages, including an initial review of your application, followed by interviews with our hiring team. We may also conduct skill assessments or background checks depending on the role. Once selected, our HR team will extend an offer, and we will guide you through the onboarding process.",
  },
  // {
  //   question: "How can I check the status of my job applications?",
  //   answer:
  //     "You can check the status of your job applications by logging into your profile and navigating to the 'My Applications' section.",
  // },
  {
    question: "What qualities do you look for in a candidate?",
    answer:
      "We value candidates who demonstrate strong communication skills, problem-solving abilities, and a collaborative mindset. We also look for individuals who align with our company values, are adaptable, and show a willingness to learn and grow within the role.",
  },
  {
    question: "How long does the recruitment process typically take?",
    answer:
      "The timeline can vary depending on the role and the number of applicants. However, we typically complete the process within 2 to 4 weeks. You will be informed of the progress and next steps at each stage.",
  },
  {
    question:
      "What is the company's approach to work-life balance",
    answer:
      "We believe in maintaining a healthy work-life balance for our employees. We encourage time off when needed and provide flexible working arrangements when possible. Our goal is to ensure that employees can thrive both professionally and personally",
  },
];

const FAQSection = () => {
  return (
    <div className="max-w-7xl px-0 mx-auto my-10 p-6 bg-white shadow-lg rounded-lg border border-gray-300">
      <h2 className="text-3xl font-bold text-center text-[#858484] mb-6">
        Frequently Asked Questions
      </h2>
      <Collapse
        accordion
        bordered={false}
        expandIcon={({ isActive }) => (
          <PlusOutlined
            className={`transform transition ${
              isActive ? "rotate-45 text-blue-600" : "text-gray-500"
            }`}
          />
        )}
        expandIconPosition="end"
        className="bg-white"
      >
        {faqs.map((faq, index) => (
          <Panel
            header={
              <div className="flex justify-between items-center w-full">
                <span className="text-lg font-medium">{faq.question}</span>
              </div>
            }
            key={index}
            className="border-b border-gray-300 px-6 py-4"
          >
            <p className="text-gray-600">{faq.answer}</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default FAQSection;
