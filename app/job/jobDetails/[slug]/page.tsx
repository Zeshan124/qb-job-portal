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
      <div className="mt-20 mb-12">
        <div className="w-[80%] mx-auto border rounded-lg p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h1 className="text-3xl font-semibold">{job.jobTitle}</h1>

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
            <div className="flex mt-2 items-start justify-start md:justify-end">
              <ApplyButton jobID={job.jobID} />
            </div>
          </div>
        </div>
        <div className="mt-20 mb-12 w-[80%] mx-auto">
          {job.images && (
            <div className="mt-6">
              <Image
                src={job.images}
                alt="Job Post"
                width={800} // ✅ Set a width
                height={500} // ✅ Set a height
                layout="responsive" // ✅ Responsive resizing
                className="w-full h-auto max-h-65 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="mt-10">
            <div
              className="mt-4 text-gray-600"
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
