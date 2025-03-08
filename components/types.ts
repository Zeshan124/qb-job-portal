// types.ts
export interface Job {
    jobID: number;
    slug: string;
    jobTitle: string;
    location: string;
  }
  
  export interface Category {
    categoryID: number;
    categoryName: string;
    createdAt: string;
    jobs: Job[];
  }
  