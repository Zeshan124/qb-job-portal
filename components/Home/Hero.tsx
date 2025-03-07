"use client";

import { getCategories } from "@/app/utils/api";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Define types for category and job
interface Job {
  jobID: number;
  slug: string;
  jobTitle: string;
  location: string;
}

interface Category {
  categoryID: number;
  categoryName: string;
  createdAt: string;
  jobs: Job[];
}

export default function Hero() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isJobCardLoading, setIsJobCardLoading] = useState<boolean>(false);
  const [loadingJobId, setLoadingJobId] = useState<number | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data: Category[] = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;

    const category = categories.find(
      (cat) => cat.categoryID.toString() === selectedCategory
    );

    if (category) {
      let filteredJobs = [...category.jobs];

      // Filter by search query if provided
      if (searchQuery) {
        filteredJobs = filteredJobs.filter(
          (job) =>
            job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setJobs(filteredJobs);
    } else {
      setJobs([]);
    }
  };

  const handleJobCardClick = (job: Job) => {
    setIsJobCardLoading(true);
    setLoadingJobId(job.jobID);
    const urlSlug = job.slug || job.jobTitle.toLowerCase().replace(/\s+/g, "-");
    router.push(`/job/jobDetails/${urlSlug}`);
  };

  return (
    <div className="relative pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      {/* Background Video with Black Overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          className="object-cover w-full h-full filter blur-sm opacity-50"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/images/hr-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent opacity-70"></div>
      </div>

      <div className="relative z-10 w-full min-h-[70vh] flex items-center justify-center">
        <div className="w-[80%] mx-auto text-center">
          <h1 className="text-[40px] md:text-[50px] lg:text-[60px] font-extrabold text-indigo-400 leading-tight">
            <span className="text-indigo-300">3,000+</span> Browse Jobs
          </h1>
          <p className="text-gray-200 text-[18px] md:text-[20px] mt-4 leading-relaxed">
            Find Jobs, Employment & Career Opportunities
          </p>

          {/* Search Form */}
          <div className="mt-8 bg-gray-900 bg-opacity-50 p-6 rounded-lg shadow-lg">
            <form
              className="flex flex-col md:flex-row gap-4"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full md:w-1/3 p-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none"
                value={searchQuery}
                onChange={handleSearchQueryChange}
              />
              <select className="w-full md:w-1/3 p-3 rounded-lg bg-white text-gray-900 focus:outline-none">
                <option value="">All Regions</option>
                <option value="">Karachi</option>
              </select>
              <select
                className="w-full md:w-1/3 p-3 rounded-lg bg-white text-gray-900 focus:outline-none"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Choose a category...</option>
                {categories.map((category) => (
                  <option
                    key={category.categoryID}
                    value={category.categoryID.toString()}
                  >
                    {category.categoryName}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
              >
                SEARCH
              </button>
            </form>
          </div>

          {/* Display Jobs */}
          {jobs.length > 0 ? (
            <div className="mt-6">
              <h2 className="text-xl text-white font-semibold mb-4">
                Found {jobs.length} jobs
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                  <div
                    key={job.jobID}
                    className="bg-gray-800 bg-opacity-80 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition"
                    onClick={() => handleJobCardClick(job)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-indigo-300 font-medium text-lg">
                        {job.jobTitle}
                      </h3>
                      {loadingJobId === job.jobID && isJobCardLoading ? (
                        <div className="w-5 h-5 border-2 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
                      ) : null}
                    </div>
                    <p className="text-gray-300 text-sm">
                      <span className="inline-block mr-2">📍</span>
                      {job.location}
                    </p>
                    <div className="mt-3 text-right">
                      <span className="text-xs text-indigo-400 hover:text-indigo-300">
                        View Details →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            selectedCategory && (
              <p className="mt-6 text-red-400">
                {/* No jobs found for this category. */}
              </p>
            )
          )}

          {/* Trending Keywords */}
          <div className="mt-6 text-cyan-300 text-sm">
            <span>Trending Keywords:</span> developer, design, it company,
            media, new, jobs, working, medical
          </div>
        </div>
      </div>
    </div>
  );
}
