import React from "react";
import { ApplyButton } from "@/paths";
import { fetchJobBySlug } from "@/app/utils/api";
import { Spin, message } from "antd";
import { notFound } from "next/navigation";
import Image from "next/image";

interface Job {
  jobID: number;
  jobTitle: string;
  jobDescription: string;
  location: string;
  minSalary: number | null;
  maxSalary: number | null;
  categoryName: string;
  images: string;
}

const JobDetails = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  try {
    const job: Job = await fetchJobBySlug(slug);

    if (!job) {
      return notFound();
    }

    return (
      <div className="mt-20 mb-12 w-[80%] mx-auto border rounded-lg p-6">
        {/* Job Header Card */}
        <div className="bg-white p-8 transition-all duration-300 hover:shadow-xl">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {/* Job Details */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                {job.jobTitle}
              </h1>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong className="text-gray-900">Location:</strong>{" "}
                  <span className="inline-flex items-center">
                    <svg
                      className="w-4 h-4 mr-1 text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {job.location}
                  </span>
                </p>
                <p>
                  <strong className="text-gray-900">Category:</strong>{" "}
                  <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                    {job.categoryName}
                  </span>
                </p>
                {job.minSalary && job.maxSalary && (
                  <p>
                    <strong className="text-gray-900">Salary:</strong>{" "}
                    <span className="text-green-600 font-semibold">
                      {job.minSalary} - {job.maxSalary}
                    </span>
                  </p>
                )}
              </div>
            </div>
            {/* Apply Button */}
            <div className="flex items-start justify-start md:justify-end">
              <ApplyButton jobID={job.jobID} />
            </div>
          </div>
        </div>

        {/* Job Description & Image Section */}
        <div className="mt-12 space-y-10">
          {job.images && (
            <div className="relative group">
              <Image
                src={job.images}
                alt={`${job.jobTitle} preview`}
                width={800}
                height={500}
                layout="responsive"
                className="w-full h-auto max-h-[400px] object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Job Description
            </h2>
            <div
              className="text-gray-600 leading-relaxed prose prose-indigo max-w-none"
              dangerouslySetInnerHTML={{ __html: job.jobDescription }}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching job details:", error);
    message.error("Failed to load job details. Please try again.");

    return (
      <div className="text-center mt-20">
        <p className="text-red-500">
          Failed to load job details. Please try again.
        </p>
      </div>
    );
  }
};

export default JobDetails;
