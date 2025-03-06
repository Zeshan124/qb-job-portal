import { fetchJobs } from "@/app/utils/api";
import JobCard from "@/components/Helpers/JobCard";
import JobsPagination from "@/components/Jobs/JobsPagination";
import SearchForm from "@/components/Jobs/SearchForm";

interface Job {
  jobID: number;
  jobTitle: string;
  minSalary?: number;
  maxSalary?: number;
  location: string;
  categoryName: string;
  jobDescription?: string;
  slug: string;
  jobStatus: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; pageSize?: string; search?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams.pageSize ? parseInt(searchParams.pageSize) : 10;
  const searchText = searchParams.search || "";

  const { jobs, totalJobs } = await fetchJobs(page, pageSize, searchText);

  return (
    <div className="mt-12 w-[80%] mx-auto mb-12">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="semi-bold">Show Result ({totalJobs})</h1>
        <SearchForm initialSearch={searchText} />
      </div>

      <div className="mt-12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {jobs.map((job: Job) => (
          <a href={`/job/jobDetails/${job.slug}`} key={job.jobID}>
            <JobCard
              job={{
                id: job.jobID,
                title: job.jobTitle,
                image: "/images/icon5.png",
                salary: job.minSalary
                  ? `${job.minSalary.toLocaleString()} - ${job.maxSalary?.toLocaleString()}`
                  : "Not specified",
                location: job.location,
                jobtype: job.categoryName,
                description: job.jobDescription || "",
                slug: job.slug,
                jobStatus: job.jobStatus,
              }}
            />
          </a>
        ))}
      </div>

      <JobsPagination
        current={page}
        pageSize={pageSize}
        total={totalJobs}
        searchText={searchText}
      />
    </div>
  );
}
