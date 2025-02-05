import JobData from "@/data";
import { authOptions } from "@/Auth";
import { ApplyButton, JobCard } from "@/paths";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React, { Suspense } from "react";

const JobDeatils = async ({ params }: { params: { id: string } }) => {
  const getJobDetail = JobData?.find((job) => job.id.toString() === params.id);
  const session = await getServerSession(authOptions);
  const relatedJobs = JobData?.slice(0, 4);

  return (
    <Suspense
      fallback={
        <div className="text-center text-lg font-semibold mt-20">
          Loading Job Details...
        </div>
      }
    >
      <div className="mt-20 mb-12">
        <div className="block sm:flex items-center justify-between w-[80%] mx-auto">
          <div className="flex-[0.7]">
            {getJobDetail ? (
              <JobCard job={getJobDetail} />
            ) : (
              <p>Job not found.</p>
            )}
          </div>
          <ApplyButton />
        </div>
        <div className="mt-16 w-[80%] mx-auto">
          <h1 className="text-xl font-semibold">Job Description</h1>
          <p className="mt-4 text-black text-opacity-70">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="mt-10 ">
            <h1 className="text-xl font-semibold">Key Responsibilities</h1>
            <p className="mt-4 text-black text-opacity-70">
              Lorem ipsum dolor sit amet...
            </p>
          </div>
          <div className="mt-10">
            <h1 className="text-xl font-semibold">Related Jobs</h1>
            {relatedJobs?.map((job) => (
              <Link
                key={job.id}
                href={`/job/jobDetails/${job.id}`}
                className="space-y-6"
              >
                <JobCard job={job} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default JobDeatils;
