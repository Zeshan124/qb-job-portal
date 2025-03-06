// app/page.tsx
import FeatureJobsClient from "@/components/Home/FeatureJobsClient";
import { Footer, Hero } from "@/paths";
import React, { Suspense } from "react";
import { fetchJobs } from "./utils/api";
import FAQ from "@/components/Home/FAQ";
import LoadingSpinner from "@/components/loader/LoadingSpinner";

const page = async () => {
  const { jobs } = await fetchJobs(1, 10, "");

  return (
    <div>
      <Hero />
      <Suspense fallback={<LoadingSpinner />}>
        <FeatureJobsClient jobs={jobs} />
        <div className="bg-gray-50 py-6 px-6">
          <FAQ />
        </div>
      </Suspense>
      <Footer />
    </div>
  );
};

export default page;
