export interface Job {
  jobID: number;
  jobTitle: string;
  jobDescription?: string;
  location: string;
  minSalary?: number | null;
  maxSalary?: number | null;
  slug: string;
  cityID?: number;
  jobStatus?: string;
}

export interface Category {
  categoryID: number;
  categoryName: string;
  createdAt: string;
  jobs: Job[];
}

export interface City {
  cityID: number;
  cityName: string;
}
