"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heading } from "../../paths";
import JobCard from "../Helpers/JobCard";
import { Button, Spin } from "antd";

interface Job {
  jobID: number;
  jobTitle: string;
  jobDescription: string;
  location: string;
  minSalary: number | null;
  maxSalary: number | null;
  categoryName: string;
  slug: string;
  jobStatus: string;
}

interface FeatureJobsProps {
  jobs: Job[];
}

export default function FeatureJobsClient({ jobs }: FeatureJobsProps) {
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isJobCardLoading, setIsJobCardLoading] = useState<boolean>(false);
  const router = useRouter();

  console.log(jobs, "jobs");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleViewAllJobs = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/job/alljobs");
    }, 500);
  };

  const handleJobCardClick = (job: Job) => {
    setIsJobCardLoading(true);
    setTimeout(() => {
      router.push(`/job/jobDetails/${job.slug}`);
    }, 500);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="pt-8 md:pt-20 pb-8 md:pb-12">
      {isJobCardLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Spin size="large" className="text-white" />
        </div>
      )}

      <Heading
        mainHeading="Feature Jobs"
        subHeading="Find the job that fits you best"
      />

      <div className="mt-12 w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {jobs.length > 0 ? (
          jobs.slice(0, 6).map((job) => (
            <div
              key={job.jobID}
              onClick={() => handleJobCardClick(job)}
              className="cursor-pointer"
            >
              <JobCard
                job={{
                  id: job.jobID,
                  title: job.jobTitle,
                  image: "/images/icon5.png",
                  salary: job.minSalary
                    ? `${job.minSalary.toLocaleString()} - ${job.maxSalary?.toLocaleString()}`
                    : "Not specified",
                  location: job.location,
                  jobtype: job.categoryName,
                  description: job.jobDescription || "",
                  slug: job.slug,
                  jobStatus: job.jobStatus,
                }}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No jobs available</p>
        )}
      </div>

      <div className="text-center mt-12">
        <Button
          type="primary"
          size="large"
          onClick={handleViewAllJobs}
          disabled={isLoading}
          className="bg-[#8570C5] hover:bg-purple-500 px-6 py-2"
        >
          {isLoading ? <Spin size="small" /> : "View all jobs"}
        </Button>
      </div>
    </div>
  );
}
