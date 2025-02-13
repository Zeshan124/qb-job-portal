import FeatureJobsClient from "@/components/Home/FeatureJobsClient";
import { Footer, Hero } from "@/paths";
import React from "react";

interface Job {
  jobID: number;
  jobTitle: string;
  jobDescription: string;
  location: string;
  minSalary: number | null;
  maxSalary: number | null;
  categoryName: string;
}

async function fetchJobs(): Promise<Job[]> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_URL_API;
    if (!API_URL) throw new Error("API_URL is not defined");
    const res = await fetch(`${API_URL}/apis/job/get`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch jobs");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
    return [];
  }
}

const page = async () => {
  const jobs = await fetchJobs();
  return (
    <div>
      <Hero />
      <FeatureJobsClient jobs={jobs} />
      <Footer />
    </div>
  );
};

export default page;
