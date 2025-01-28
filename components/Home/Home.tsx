import React from "react";
import { Hero, JobCategory } from "../../paths";
import FeatureJobs from "./FeatureJobs";
import OurPartner from "./OurPartner";

const Home = () => {
  return (
    <div>
      <Hero />
      {/* <JobCategory /> */}
      <FeatureJobs />
      {/* <OurPartner /> */}
    </div>
  );
};

export default Home;
