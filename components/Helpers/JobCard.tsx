"use client";

import Image from "next/image";
import React, { useState } from "react";
import { BiMoney } from "react-icons/bi";
import { FaMapLocation } from "react-icons/fa6";

interface JobCardProps {
  job: {
    id: number;
    title: string;
    image: string;
    salary: string;
    location: string;
    jobtype: string;
    description: string;
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
    <div className="relative transition-transform duration-300 hover:scale-105 border-gray-600 rounded-lg border-2 border-opacity-20 p-1 md:p-2 md:mb-2">
      <div className="flex items-center space-x-6">
        {/* Image */}
        <div>
          <Image
            src={job.image}
            alt={job.title}
            width={50}
            height={50}
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-base font-semibold mb-2">{job.title}</h1>
          <div className="flex items-center md:space-x-10 space-x-4">
            <div className="flex items-center space-x-2">
              <FaMapLocation className="w-4 h-4 text-pink-600" />
              <p className="text-sm text-black font-semibold opacity-60">
                {job?.location}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <BiMoney className="w-4 h-4 text-pink-600" />
              <p className="text-sm text-black font-semibold text-opacity-60">
                {job?.salary}
              </p>
            </div>
          </div>

          <div className="flex item-center space-x-2 sm:space-x-4 mt-[1rem]">
            <div className="text-[10px] sm:text-sm text-opacity-80 px-2 sm:px-6 py-1 rounded-full bg-opacity-30 font-semibold capitalize bg-green-600">
              {job?.jobtype}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Truncated Job Description
      <p className="mt-2 text-gray-600">
        {showFullDescription ? (
          <span dangerouslySetInnerHTML={{ __html: job.description }} />
        ) : (
          truncatedText
        )}
      </p> */}

      {/* ✅ Toggle Full Description Button */}
      {/* <button
        className="text-blue-500 mt-2"
        onClick={() => setShowFullDescription(!showFullDescription)}
      >
        {showFullDescription ? "Show Less" : "Read More"}
      </button> */}
    </div>
  );
};

export default JobCard;
