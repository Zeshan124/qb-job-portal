import FeatureJobsClient from "@/components/Home/FeatureJobsClient";
import { Footer, Hero } from "@/paths";
import React from "react";
import { fetchJobs } from "./utils/api";

const page = async () => {
  const { jobs } = await fetchJobs(1, 10, "");

  return (
    <div>
      <Hero />
      <FeatureJobsClient jobs={jobs} />
      <Footer />
    </div>
  );
};

export default page;
