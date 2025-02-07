"use client"; // 👈 Required to make this a Client Component

import React, { useEffect, useState } from "react";
import { Heading, JobCard } from "../../paths";
import Link from "next/link";
import { getAllJobs } from "@/app/utils/api";

interface Job {
  jobID: number;
  jobTitle: string;
  jobDescription: string;
  location: string;
  minSalary: number | null;
  maxSalary: number | null;
  categoryName: string;
}

const FeatureJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const jobsData = await getAllJobs();
        setJobs(jobsData.slice(0, 4)); // ✅ Show only the first 4 jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="pt-8 md:pt-20 pb-8 md:pb-12">
      <Heading
        mainHeading={"Feature jobs"}
        subHeading={"Know your worth and find the job that quality your life"}
      />

      <div className="mt-12 w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {jobs.map((job) => (
          <Link key={job.jobID} href={`/job/jobDetails/${job.jobID}`}>
            <JobCard
              job={{
                id: job.jobID,
                title: job.jobTitle,
                image: "/images/c1.png", // Provide a default image
                salary: job.minSalary
                  ? `$${job.minSalary} - $${job.maxSalary}`
                  : "Not specified",
                location: job.location,
                jobtype: job.categoryName,
              }}
            />
          </Link>
        ))}
      </div>

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
