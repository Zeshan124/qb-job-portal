"use client";

import Image from "next/image";
import React, { useState } from "react";
import { BiMoney } from "react-icons/bi";
import { FaMapLocation } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi"; // New icon for the circular button
import { motion } from "framer-motion"; // Optional: for animations

interface JobCardProps {
  job: {
    id: number;
    title: string;
    image: string;
    salary: string;
    location: string;
    jobtype: string;
    description: string;
    slug: string;
    jobStatus: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const plainTextDescription = job.description.replace(/<\/?[^>]+(>|$)/g, "");
  const truncatedText =
    plainTextDescription.length > 100
      ? plainTextDescription.slice(0, 100) + "..."
      : plainTextDescription;

  return (
    <motion.div
      className="relative bg-white shadow-md rounded-2xl p-5 md:p-6 mb-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100"
      whileHover={{ scale: 1.03 }} // Subtle hover animation
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-5">
        {/* Image */}
        <div className="flex-shrink-0 relative">
          <Image
            src={job.image}
            alt={job.title}
            width={90} // Slightly larger for visual appeal
            height={90}
            className="object-cover rounded-full border-2 border-indigo-100"
          />
          {/* Optional: Status badge overlay */}
          <span
            className={`absolute -top-2 -right-2 px-2 py-1 text-xs font-semibold text-white rounded-full shadow-md ${
              job.jobStatus === "open" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {job.jobStatus === "open" ? "Open" : "Closed"}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 hover:text-indigo-700 transition-colors">
            {job.title}
          </h1>

          {/* Meta Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-3">
              <FaMapLocation className="w-5 h-5 text-indigo-600" />
              <span className="text-sm text-gray-700 font-medium">
                {job.location}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <BiMoney className="w-5 h-5 text-indigo-600" />
              <span className="text-sm text-gray-700 font-medium">
                {job.salary}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {showFullDescription ? plainTextDescription : truncatedText}
            {plainTextDescription.length > 100 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-indigo-600 font-semibold text-sm ml-2 hover:underline"
              >
                {showFullDescription ? "Show Less" : "Read More"}
              </button>
            )}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-full capitalize">
              {job.jobtype}
            </span>
          </div>
        </div>

        {/* Circular Button */}
        <div className="absolute bottom-5 right-5">
          <motion.button
            className="flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;