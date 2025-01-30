import React from "react";
import { Footer, Hero, JobCategory } from "../../paths";
import FeatureJobs from "./FeatureJobs";
import OurPartner from "./OurPartner";

const Home = () => {
  return (
    <div>
      <Hero />
      {/* <JobCategory /> */}
      <FeatureJobs />
      {/* <OurPartner /> */}
      <Footer />
    </div>
  );
};

export default Home;
