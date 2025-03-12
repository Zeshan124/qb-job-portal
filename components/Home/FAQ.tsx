"use client";

import React, { useState } from "react";
import { Collapse } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Link from "next/link";

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
    question: "What is the company's approach to work-life balance",
    answer:
      "We believe in maintaining a healthy work-life balance for our employees. We encourage time off when needed and provide flexible working arrangements when possible. Our goal is to ensure that employees can thrive both professionally and personally",
  },
];

const FAQSection = () => {
  const [activeKey, setActiveKey] = useState<string | string[]>([]);

  const onChange = (key: string | string[]) => {
    setActiveKey(key);
  };

  return (
    <div className="max-w-8xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <div className="relative bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full -ml-32 -mb-32 opacity-50"></div>

        <div className="relative px-6 py-10 sm:p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block p-1 px-3 mb-2 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full uppercase tracking-wider">
              Get answers
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="max-w-2xl mx-auto text-gray-500 text-sm sm:text-base">
              Find answers to common questions about our recruitment process and
              job opportunities
            </p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          {/* FAQ Items */}
          <div className="max-w-6xl mx-auto">
            <Collapse
              accordion
              bordered={false}
              activeKey={activeKey}
              onChange={onChange}
              expandIcon={({ isActive }) =>
                isActive ? (
                  <MinusOutlined className="text-indigo-600 text-base" />
                ) : (
                  <PlusOutlined className="text-gray-500 text-base" />
                )
              }
              expandIconPosition="end"
              className="bg-transparent"
            >
              {faqs.map((faq, index) => (
                <Panel
                  header={
                    <div className="flex justify-between items-center w-full py-2">
                      <span
                        className={`text-base sm:text-lg font-medium transition-colors duration-300 ${
                          activeKey === index.toString()
                            ? "text-indigo-600"
                            : "text-gray-700"
                        }`}
                      >
                        {faq.question}
                      </span>
                    </div>
                  }
                  key={index.toString()}
                  className={`mb-4 rounded-lg overflow-hidden transition-all duration-300 ${
                    activeKey === index.toString()
                      ? "bg-white shadow-md border border-gray-100"
                      : "bg-white/50 border border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className="px-1 py-2">
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </p>

                    {index === 0 && (
                      <button className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center">
                        Browse job openings
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    )}

                    {index === 1 && (
                      <button className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center">
                        Learn about our process
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </Panel>
              ))}
            </Collapse>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-500 mb-4">Still have questions?</p>
            <Link href="https://qistbazaar.pk/page/contact-us">
              {" "}
              <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 shadow-sm transition-all duration-300 transform hover:scale-105">
                Contact Support
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
