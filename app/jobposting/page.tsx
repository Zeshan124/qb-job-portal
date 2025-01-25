"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import postJobToAPIs, { JobDetails } from '../utils/postJobToAPIs';

export default function JobPosting() {
  const router = useRouter();
  const [jobDetails, setJobDetails] = useState<JobDetails>({
    title: '',
    company: '',
    description: '',
    location: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await postJobToAPIs(jobDetails);
    if (response.success) {
      router.push('/');
    } else {
      alert(response.error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Post a Job</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="jobTitle" className="block text-lg font-semibold text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
              value={jobDetails.title}
              onChange={(e) => setJobDetails({ ...jobDetails, title: e.target.value })}
              placeholder="Enter job title"
              required
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-lg font-semibold text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
              value={jobDetails.company}
              onChange={(e) => setJobDetails({ ...jobDetails, company: e.target.value })}
              placeholder="Enter company name"
              required
            />
          </div>

          <div>
            <label htmlFor="jobDescription" className="block text-lg font-semibold text-gray-700">
              Job Description
            </label>
            <textarea
              id="jobDescription"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
              value={jobDetails.description}
              onChange={(e) => setJobDetails({ ...jobDetails, description: e.target.value })}
              placeholder="Enter job description"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-lg font-semibold text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
              value={jobDetails.location}
              onChange={(e) => setJobDetails({ ...jobDetails, location: e.target.value })}
              placeholder="Enter job location"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-800 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
