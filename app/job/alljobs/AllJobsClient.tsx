// app/job/alljobs/AllJobsClient.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchJobs } from "@/app/utils/api";
import { Pagination, Spin, Input } from "antd";
import JobCard from "@/components/Helpers/JobCard";

const { Search } = Input;

interface Job {
  jobID: number;
  jobTitle: string;
  jobDescription: string;
  location: string;
  minSalary: number | null;
  maxSalary: number | null;
  categoryName: string;
  slug: string; // Add slug to the job interface
}

interface Props {
  jobs: Job[];
}

const AllJobsClient: React.FC<Props> = ({ jobs: initialJobs }) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: initialJobs.length,
  });

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize, searchText);
  }, [pagination.current, pagination.pageSize, searchText]);

  const fetchData = async (
    page: number,
    pageSize: number,
    jobTitle: string
  ) => {
    try {
      setLoading(true);
      const { jobs, totalJobs } = await fetchJobs(page, pageSize, jobTitle);
      setJobs(jobs);
      setPagination((prev) => ({ ...prev, total: totalJobs }));
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 w-[80%] mx-auto mb-12">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="semi-bold">Show Result ({pagination.total})</h1>

        {/* Search Bar */}
        <Search
          placeholder="Search jobs..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{ maxWidth: "300px" }}
        />
      </div>

      {loading ? (
        <div className="flex justify-center mt-10">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="space-y-10 pt-2">
            {jobs.map((job) => (
              <Link key={job.jobID} href={`/job/jobDetails/${job.slug}`}>
                <JobCard
                  job={{
                    id: job.jobID,
                    title: job.jobTitle,
                    image: "/images/icon9.png",
                    salary: job.minSalary
                      ? `${job.minSalary} - ${job.maxSalary}`
                      : "Not specified",
                    location: job.location,
                    jobtype: job.categoryName,
                    description: job.jobDescription || "",
                    slug: job.slug, // Pass the slug to the JobCard
                  }}
                />
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Pagination
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              showSizeChanger
              onChange={(page, pageSize) =>
                setPagination({ ...pagination, current: page, pageSize })
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AllJobsClient;
