import React from "react";
import {
  SearchOutlined,
  FilePdfOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: <SearchOutlined />,
    title: "Browse Job",
    description:
      "Browse job listings tailored to your skills and preferences to find the perfect career opportunity.",
    step: 1,
    isHighlighted: false,
  },
  {
    icon: <FilePdfOutlined />,
    title: "Find Your Vacancy",
    description:
      "Use our advanced filters to narrow down the search and discover vacancies that match your qualifications and career goals.",
    step: 2,
    isHighlighted: false,
  },
  {
    icon: <MobileOutlined />,
    title: "Submit Resume",
    description:
      "Apply with a single click by uploading your resume or CV, and track your application status in real-time.",
    step: 3,
    isHighlighted: true,
  },
];

const EasiestWayToUse = () => {
  return (
    <div
      className="relative w-full py-20"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 27, 75, 0.9), rgba(30, 27, 75, 0.8)), url('/images/1.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "inset 0 0 50px rgba(0,0,0,0.5)",
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 text-center">
          Easiest Way To Use
        </h2>
        <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-16"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              step={feature.step}
              isHighlighted={feature.isHighlighted}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EasiestWayToUse;
