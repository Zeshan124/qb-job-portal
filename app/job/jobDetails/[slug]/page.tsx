// app/job/jobDetails/[slug]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { ApplyButton } from "@/paths";
import { fetchJobBySlug } from "@/app/utils/api";
import { Spin, message } from "antd";

interface Job {
  jobID: number;
  jobTitle: string;
  jobDescription: string;
  location: string;
  minSalary: number | null;
  maxSalary: number | null;
  categoryName: string;
  images?: string; // ✅ Add this
}

const JobDetails = ({ params }: { params: { slug: string } }) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const jobData = await fetchJobBySlug(params.slug); // Fetch job details by slug
        setJob(jobData); // Update state with job details
      } catch (error) {
        console.error("Error fetching job details:", error);
        message.error("Failed to load job details. Please try again.");
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="text-center mt-20">
        <Spin size="large" />
        <p className="mt-4 text-gray-500">Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center mt-20">
        <p className="text-gray-500">Job not found.</p>
      </div>
    );
  }

  return (
    <div className="mt-20 mb-12">
      <div className="w-[80%] mx-auto border rounded-lg p-6">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-semibold">{job.jobTitle}</h1>
            {job.images && (
              <img
                src={`https://bhrportal.qist.pk${job.images}`}
                alt={job.jobTitle}
                className="mt-4 w-64 h-auto rounded-lg shadow-md"
              />
            )}
            <p className="mt-4">
              <strong>Location:</strong> {job.location}
            </p>
            <p>
              <strong>Category:</strong> {job.categoryName}
            </p>
            {job.minSalary && job.maxSalary && (
              <p>
                <strong>Salary:</strong> {job.minSalary} - {job.maxSalary}
              </p>
            )}
          </div>
          <div className="flex items-start justify-end">
            <ApplyButton jobID={job.jobID} />
          </div>
        </div>
      </div>

      <div className="mt-10 w-[80%] mx-auto">
        <div
          className="mt-4 text-gray-600"
          dangerouslySetInnerHTML={{ __html: job.jobDescription }}
        />
      </div>
    </div>
  );
};

export default JobDetails;
