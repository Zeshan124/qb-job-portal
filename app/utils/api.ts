"use client";

import { message } from "antd";
import axios from "axios";
import useSWR from "swr";

const API_URL = process.env.NEXT_PUBLIC_URL_API;

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;
const headers = token
  ? { "x-access-token": token, "Content-Type": "application/json" }
  : {};

const fetcher = (url: string) =>
  axios.get(url, { headers }).then((res) => res.data);

export const useJobs = (page = 1, limit = 10) => {
  const { data, error } = useSWR(
    `${API_URL}/apis/job/get?page=${page}&limit=${limit}`,
    fetcher
  );
  return { jobs: data?.data, isLoading: !data && !error, error };
};

export const postJob = async (jobData: {
  jobTitle: string;
  jobDescription: string;
  location: string;
  minSalary: number;
  maxSalary: number;
  categoryID: number;
}) => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    console.log("Using Token for POST API:", token);

    if (!token) {
      throw new Error("Authentication failed: No token found.");
    }

    const response = await axios.post(`${API_URL}/apis/job/add`, jobData, {
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
    });

    console.log("Job posted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error posting job:",
      (error as { response?: { data?: string } })?.response?.data ||
        (error as Error).message
    );
    throw error;
  }
};

export const fetchJobs = async (
  page: number,
  pageSize: number,
  jobTitle: string
) => {
  try {
    const response = await axios.get(
      `${API_URL}/apis/job/get?page=${page}&pageSize=${pageSize}&jobTitle=${encodeURIComponent(
        jobTitle
      )}`
    );

    return {
      jobs: response.data.data,
      totalJobs: response.data.pagination.totalJobs,
    };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const getJobs = async (page = 1, pageSize = 10, jobTitle = "") => {
  try {
    console.log(`Fetching page ${page} with search text "${jobTitle}"`);
    const response = await axios.get(
      `${API_URL}/apis/job/get?page=${page}&pageSize=${pageSize}&jobTitle=${encodeURIComponent(
        jobTitle
      )}`
    );
    return response.data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};

export const deleteJob = async (jobID: number) => {
  if (!token) throw new Error("Authentication failed: No token found.");
  return axios
    .delete(`${API_URL}/apis/job/delete`, { headers, data: { jobID } })
    .then((res) => res.data);
};

export const updateJob = async (
  jobID: number,
  updatedJob: {
    jobTitle?: string;
    jobDescription?: string;
    jobStatus?: string;
    categoryID?: number;
  }
) => {
  if (!token) throw new Error("Authentication failed: No token found.");
  console.log("API Request Data:", updatedJob);
  return axios
    .patch(`${API_URL}/apis/job/update`, { jobID, ...updatedJob }, { headers })
    .then((res) => res.data);
};

export const fetchJobByID = async (jobID: number) => {
  try {
    const response = await axios.get(`${API_URL}/apis/job/getByID/${jobID}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    throw error;
  }
};

export const getCategoryById = async (jobID: number) => {
  if (!token) throw new Error("Authentication failed: No token found.");
  return axios
    .post(`${API_URL}/apis/categories/getById`, { jobID }, { headers })
    .then((res) => res.data.data);
};

export const getAllJobs = async () => {
  return axios
    .get(`${API_URL}/apis/job/get`)
    .then((res) => res.data.data)
    .catch((error) => {
      console.error("Error fetching jobs:", error);
      throw error;
    });
};

export const fetchApplications = async (page: number, pageSize: number) => {
  try {
    const response = await axios.get(`${API_URL}/apis/application/get`, {
      params: { page, pageSize }, // Using params object for cleaner syntax
    });

    return {
      applications: response.data.data,
      totalApplications: response.data.pagination.totalApplications,
    };
  } catch (error: any) {
    console.error(
      "Error fetching applications:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getCandidateByID = async (candidateID: number) => {
  return axios
    .get(`${API_URL}/apis/application/getByID/${candidateID}`)
    .then((res) => res.data);
};

export const updateCandidateStatus = async (
  candidateID: number,
  status: string
) => {
  return axios
    .patch(
      `${API_URL}/apis/application/patch`,
      { candidateID, status },
      { headers }
    )
    .then((res) => res.data);
};

export const downloadResume = async (candidateID: number) => {
  return axios
    .get(`${API_URL}/apis/application/getByID/${candidateID}`, {
      responseType: "blob",
    })
    .then((res) => res.data);
};

interface Category {
  categoryID: number;
  categoryName: string;
  createdAt: string;
  jobs: Job[];
}

interface Job {
  jobID: number;
  jobTitle: string;
  jobDescription: string;
  location: string;
  minSalary: number | null;
  maxSalary: number | null;
}

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${API_URL}/apis/categories/getAll`);

    return response.data.data.map((category: any) => ({
      categoryID: category.categoryID,
      categoryName: category.categoryName,
      createdAt: category.createdAt || new Date().toISOString(),
      jobs: Array.isArray(category.jobs) ? category.jobs : [],
    }));
  } catch (error: any) {
    console.error(
      "❌ Error fetching categories:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteCategory = async (categoryId: number) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) {
    message.error("Authentication token is missing! Please log in.");
    return false;
  }

  try {
    const response = await axios.delete(`${API_URL}/apis/categories/delete`, {
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      data: { categoryId },
    });

    if (response.status === 200 || response.status === 201) {
      message.success("Category deleted successfully");
      return true;
    }
  } catch (error: any) {
    console.error("DELETE API Error:", error.response || error.message);
    message.error(error.response?.data?.message || "Failed to delete category");
  }
  return false;
};

export const updateCategory = async (
  categoryId: number,
  categoryName: string
) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) {
    message.error("Authentication token is missing! Please log in.");
    return false;
  }

  try {
    const response = await axios.patch(
      `${API_URL}/apis/categories/update`,
      { categoryId, categoryName },
      {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      message.success("Category updated successfully");
      return true;
    }
  } catch (error: any) {
    console.error("PATCH API Error:", error.response || error.message);
    message.error(error.response?.data?.message || "Failed to update category");
  }
  return false;
};

export const addCategory = async (categoryName: string) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    message.error("Authentication token is missing! Please log in.");
    return false;
  }

  try {
    const response = await axios.post(
      `${API_URL}/apis/categories/add`,
      { categoryName },
      {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API Response:", response.data); // ✅ Debugging
    if (response.status === 200 || response.status === 201) {
      message.success("Category added successfully");
      return true;
    } else {
      message.error("Failed to add category");
      return false;
    }
  } catch (error: any) {
    console.error("POST API Error:", error.response || error.message);
    message.error(error.response?.data?.message || "Failed to add category");
    return false;
  }
};
