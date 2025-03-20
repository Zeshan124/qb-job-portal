// app/page.tsx
import FeatureJobsClient from "@/components/Home/FeatureJobsClient";
import { Footer, Hero } from "@/paths";
import React, { Suspense } from "react";
import { fetchJobs } from "./utils/api";
import FAQ from "@/components/Home/FAQ";
import LoadingSpinner from "@/components/loader/LoadingSpinner";
import SponsoredCarousel from "@/components/Home/SponsoredCarousel";
import MyServices from "@/components/Home/Services";
import EasiestWayToUse from "@/components/Home/EasiestWay";
import FeedbackSection from "@/components/Home/FeedbackCard";

const page = async () => {
  const { jobs } = await fetchJobs(1, 10, "");

  return (
    <div>
      <Hero />
      <Suspense fallback={<LoadingSpinner />}>
        <main className="font-poppins">
          <EasiestWayToUse />
        </main>
        {/* <div className=" bg-gray-100 flex items-center justify-center">
          <SponsoredCarousel />
        </div> */}
        <FeatureJobsClient jobs={jobs} />
        <MyServices />
          <SponsoredCarousel />
        <FeedbackSection />
        <div className="bg-gray-50 py-6 px-6">
          <FAQ />
        </div>
      </Suspense>
      <Footer />
    </div>
  );
};

export default page;
