"use client"; // Add this if using App Router

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Heading, JobCard } from "../../paths";
import JobData from "@/data";
import Link from "next/link";

const FeatureJobs = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = (id: string) => {
    setLoading(true);
    router.push(`/job/jobDetails/${id}`);
  };

  return (
    <div className="pt-8 md:pt-20 pb-8 md:pb-12">
      <Heading
        mainHeading={"Feature jobs"}
        subHeading={"Know your worth and find the job that improves your life"}
      />

      <div className="mt-12 w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {JobData?.map((job) => {
          return (
            <button
              key={job?.id}
              onClick={() => handleClick(job?.id.toString())}
              className="w-full text-left"
            >
              <JobCard job={job} />
            </button>
          );
        })}
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="spinner border-t-4 border-purple-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
        </div>
      )}

      <Link href={"/job/alljobs"}>
        <div className="text-center mt-12">
          <button
            type="button"
            className="transition-transform duration-300 bg-[#8570C5] hover:bg-purple-500 px-8 py-2 font-semibold text-white rounded-lg"
          >
            View All Jobs
          </button>
        </div>
      </Link>
    </div>
  );
};

export default FeatureJobs;
