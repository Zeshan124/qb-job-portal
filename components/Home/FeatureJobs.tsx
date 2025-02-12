"use client";

import React, { useEffect, useState } from "react";
import { Heading } from "../../paths";
import Link from "next/link";
import { getAllJobs } from "@/app/utils/api";
import { useRouter } from "next/navigation";
import { Button, Spin } from "antd";
import JobCard from "../Helpers/JobCard";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const jobsData = await getAllJobs();
        setJobs(jobsData.slice(0, 4));
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleAllJobs = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/job/alljobs");
    }, 1000);
  };

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
                image: "/images/c1.png",
                salary: job.minSalary
                  ? `${job.minSalary.toLocaleString()} - ${job.maxSalary?.toLocaleString()}`
                  : "Not specified",
                location: job.location,
                jobtype: job.categoryName,
                description: job.jobDescription || "",
              }}
            />
          </Link>
        ))}
      </div>

      <Link href={"/job/alljobs"}>
        <div className="text-center mt-12">
          <Button
            type="primary"
            size="large"
            onClick={handleAllJobs}
            disabled={isLoading}
            className="transition-transform duration-300 bg-[#8570C5] hover:bg-purple-500 px-6 py-2 font-semibold text-white rounded-lg w-[200px] mx-auto"
          >
            {isLoading ? <Spin /> : "View all jobs"}
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default FeatureJobs;
