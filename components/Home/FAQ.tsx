"use client";

import React from "react";
import { Collapse } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const faqs = [
  {
    question: "How do I create a profile on the Job Portal?",
    answer:
      "To create a profile on the Job Portal, go to the registration page, sign up, and complete the required details such as your resume and personal information.",
  },
  {
    question: "How does the Job Portal work?",
    answer:
      "The Job Portal allows job seekers to create profiles, search for job openings, and apply directly to employers. Employers can post jobs and review applications.",
  },
  {
    question: "What are the Job Portal fees for employers?",
    answer:
      "The Job Portal charges a fee for employers to post job openings. The fee depends on the type of job post and additional features they choose to include.",
  },
  {
    question: "How can I check the status of my job applications?",
    answer:
      "You can check the status of your job applications by logging into your profile and navigating to the 'My Applications' section.",
  },
  {
    question: "How can I apply for jobs on the Job Portal?",
    answer:
      "To apply for jobs, simply browse the available listings, click on the job you're interested in, and submit your application along with your updated resume.",
  },
  {
    question: "Is it beneficial to post jobs on the Job Portal?",
    answer:
      "Yes, posting jobs on the Job Portal helps you reach a large pool of candidates and streamline your hiring process with features like application tracking.",
  },
  {
    question:
      "Can I use a referral code for discounts on job postings after the referral period has passed?",
    answer:
      "No, referral codes must be used within the valid period, and any unused codes after that period will no longer be valid.",
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
