import AllJobsClient from "./AllJobsClient";
import { fetchJobs } from "@/app/utils/api";

const Page = async () => {
  const { jobs, totalJobs } = await fetchJobs(1, 10, "");

  return <AllJobsClient jobs={jobs} />;
};

export default Page;
