"use client"; // 👈 This tells Next.js to treat this as a Client Component

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { JobCard } from "@/paths";

interface Job {
  jobID: number;
  jobTitle: string;
  jobDescription: string;
  location: string;
  minSalary: number | null;
  maxSalary: number | null;
  categoryName: string;
}

const AllJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://192.168.18.47:4000/apis/job/get");
        const data = await response.json();
        if (response.ok) {
          setJobs(data.data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="mt-12 w-[80%] mx-auto mb-12">
      <div className="mb-12">
        <h1 className="semi-bold">Show Result ({jobs.length})</h1>
      </div>
      <div className="space-y-10 pt-2">
        {jobs.map((job) => (
          <Link key={job.jobID} href={`/job/jobDetails/${job.jobID}`}>
            <JobCard
              job={{
                id: job.jobID,
                title: job.jobTitle,
                image: "/images/default.png",
                salary: job.minSalary ? `$${job.minSalary} - $${job.maxSalary}` : "Not specified",
                location: job.location,
                jobtype: job.categoryName,
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
