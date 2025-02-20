"use client";

import React, { useEffect, useState } from "react";
import { fetchJobs } from "@/app/utils/api";
import { Pagination, Spin, Input } from "antd";
import JobCard from "@/components/Helpers/JobCard";
import { useRouter } from "next/navigation";

const { Search } = Input;

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

interface Props {
  jobs: Job[];
}

const AllJobsClient: React.FC<Props> = ({ jobs: initialJobs }) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isJobCardLoading, setIsJobCardLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: initialJobs.length,
  });
  const router = useRouter();

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setPagination({ ...pagination, current: 1 });
  };

  const handleJobCardClick = (job: Job) => {
    setIsJobCardLoading(true);
    const slug = generateSlug(job.jobTitle);
    setTimeout(() => {
      router.push(`/job/jobDetails/${slug}`);
    }, 500);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-32">
  //       <Spin size="large" />
  //     </div>
  //   );
  // }

  return (
    <div className="mt-12 w-[80%] mx-auto mb-12">
      {isJobCardLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Spin size="large" className="text-white" />
        </div>
      )}
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="semi-bold">Show Result ({pagination.total})</h1>

        {/* Search Bar */}
        <Search
          placeholder="Search jobs..."
          value={searchText}
          onChange={handleSearchChange}
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
                    slug: job.slug ?? generateSlug(job.jobTitle),
                    jobStatus: job.jobStatus,
                  }}
                />
              </div>
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
