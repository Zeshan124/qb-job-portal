"use client";

import { getCategories, getCities, getFilterJobs } from "@/app/utils/api";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Category, City, Job } from "../types";
import { message } from "antd";

export default function Hero() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isJobCardLoading, setIsJobCardLoading] = useState<boolean>(false);
  const [loadingJobId, setLoadingJobId] = useState<number | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoryData, cityData] = await Promise.all([
          getCategories(),
          getCities(),
        ]);
        setCategories(categoryData);
        setCities(cityData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCity || !selectedCategory) {
      message.warning("Please select both a city and a category.");
      return;
    }

    try {
      setIsLoading(true);

      const jobData = await getFilterJobs(selectedCity, selectedCategory);

      if (jobData.length > 0) {
        setJobs(jobData);
      } else {
        setJobs([]);
        message.warning("No jobs found for the selected filters.");
      }
    } catch (error) {
      message.error("Failed to fetch jobs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobCardClick = (job: Job) => {
    setIsJobCardLoading(true);
    setLoadingJobId(job.jobID);
    // Directly using the slug for routing, like in FeatureJobs
    router.push(`/job/jobDetails/${job.slug}`);
  };

  return (
    <div className="relative pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
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

      <div className="relative z-10 w-full min-h-[75vh] flex items-center justify-center">
        <div className="w-[80%] mx-auto text-center">
          <h1 className="text-[40px] md:text-[50px] lg:text-[60px] font-extrabold text-indigo-400 leading-tight">
            <span className="text-indigo-300">Qist Bazaar</span> Job Portal
          </h1>
          <p className="text-gray-200 text-[18px] md:text-[20px] mt-4 leading-relaxed">
            Find Jobs, Employment & Career Opportunities
          </p>

          {/* Search Form */}
          <div className="mt-8 bg-gray-800 bg-opacity-30 p-6 rounded-lg shadow-lg ">
            <form
              className=" justify-center flex flex-col md:flex-row gap-4"
              onSubmit={handleSearch}
            >
              {/* <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full md:w-1/3 p-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none"
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                /> */}
              <select
                className="w-full md:w-1/3 p-3 rounded-lg bg-white text-gray-900 focus:outline-none"
                value={selectedCity}
                onChange={handleCityChange}
              >
                <option value="">Choose a city...</option>
                {cities.map((city) => (
                  <option key={city.cityID} value={city.cityID}>
                    {city.cityName}
                  </option>
                ))}
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
                    value={category.categoryName}
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

          {jobs.length > 0 ? (
            <div className="mt-6">
              <h2 className="text-2xl text-white font-bold mb-6 tracking-wide">
                Found <span className="text-indigo-300">{jobs.length}</span>{" "}
                Exciting Opportunities
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                  <div
                    key={job.jobID}
                    className="group relative bg-gradient-to-br from-gray-700 to-gray-900 p-5 rounded-xl cursor-pointer 
              transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20 
              border border-gray-700/50 overflow-hidden"
                    onClick={() => handleJobCardClick(job)}
                  >
                    {/* Decorative Corner Element */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-125 transition-transform duration-300"></div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-indigo-200 font-semibold text-xl leading-tight group-hover:text-indigo-100 transition-colors">
                          {job.jobTitle}
                        </h3>
                        {loadingJobId === job.jobID && isJobCardLoading ? (
                          <div className="w-6 h-6 border-2 border-t-transparent border-indigo-400 rounded-full animate-spin"></div>
                        ) : (
                          <span className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                          </span>
                        )}
                      </div>

                      <div className="space-y-3">
                        <p className="text-gray-300 text-sm flex items-center">
                          <span className="inline-flex w-6 h-6 mr-2 bg-indigo-500/20 rounded-full items-center justify-center">
                            <svg
                              className="w-3 h-3 text-indigo-300"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9 2a7 7 0 00-7 7c0 2.5 1.5 4.5 3.5 5.5L9 18l3.5-3.5C14.5 13.5 16 11.5 16 9a7 7 0 00-7-7zm0 10a3 3 0 110-6 3 3 0 010 6z" />
                            </svg>
                          </span>
                          {job.location}
                        </p>

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
                            Full Time
                          </span>
                          <span className="text-indigo-300 font-medium group-hover:text-indigo-200 transition-colors">
                            Apply Now
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                    <div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 
              opacity-0 group-hover:opacity-100 animate-pulse"
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            selectedCategory && (
              <p className="">
                {/* No opportunities found for this category yet! */}
              </p>
            )
          )}

          <div className="mt-8 text-cyan-300 text-sm">
            <p>
              Unlock Your Dream Career – Explore Opportunities That Match Your
              Passion!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
