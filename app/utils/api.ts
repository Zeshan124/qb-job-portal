import { message } from "antd";
import axios from "axios";
import useSWR from "swr";
import Cookies from "js-cookie";
import { Category } from "@/components/types";

const API_URL = process.env.NEXT_PUBLIC_URL_API;

const getToken = () => Cookies.get("token");

const getHeaders = () => {
  const token = getToken();
  return token
    ? { "x-access-token": token, "Content-Type": "application/json" }
    : {};
};

const fetcher = (url: string) =>
  axios.get(url, { headers: getHeaders() }).then((res) => res.data);

export const useJobs = (page = 1, limit = 10) => {
  const { data, error } = useSWR(
    `${API_URL}/apis/job/get?page=${page}&limit=${limit}`,
    fetcher
  );
  return { jobs: data?.data, isLoading: !data && !error, error };
};

export const postJob = async (formData: FormData) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Authentication failed: No token found.");
    }

    const response = await axios.post(`${API_URL}/apis/job/add`, formData, {
      headers: {
        "x-access-token": token,
        "Content-Type": "multipart/form-data",
      },
    });

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
      )}`,
      { headers: getHeaders() }
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

export const getFilterJobs = async (cityID: string, categoryName: string) => {
  try {
    if (!cityID || !categoryName) {
      throw new Error("City ID and Category Name are required.");
    }

    const formattedCityID = Number(cityID);

    const apiUrl = `${API_URL}/apis/job/get?page=1&pageSize=40&cityID=${formattedCityID}&categoryName=${encodeURIComponent(
      categoryName
    )}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch jobs.");
    }

    const result = await response.json();

    return result.data || [];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

export const getJobs = async (page = 1, pageSize = 10, jobTitle = "") => {
  try {
    console.log(`Fetching page ${page} with search text "${jobTitle}"`);
    const response = await axios.get(
      `${API_URL}/apis/job/get?page=${page}&pageSize=${pageSize}&jobTitle=${encodeURIComponent(
        jobTitle
      )}`,
      { headers: getHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};

export const getCities = async () => {
  try {
    const response = await axios.get(
      `https://backend.qistbazaar.pk/api/cities/get`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};

export const deleteJob = async (jobID: number) => {
  const token = getToken();
  if (!token) throw new Error("Authentication failed: No token found.");
  return axios
    .delete(`${API_URL}/apis/job/delete`, {
      headers: getHeaders(),
      data: { jobID },
    })
    .then((res) => res.data);
};

//delete candidate
export const deleteCandidate = async (candidateID: number) => {
  const token = getToken();
  if (!token) throw new Error("Authentication failed: No token found.");
  return axios
    .delete(`${API_URL}/apis/application/delete`, {
      headers: getHeaders(),
      data: { candidateID },
    })
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
  const token = getToken();
  if (!token) throw new Error("Authentication failed: No token found.");
  console.log("API Request Data:", updatedJob);
  return axios
    .patch(
      `${API_URL}/apis/job/update`,
      { jobID, ...updatedJob },
      { headers: getHeaders() }
    )
    .then((res) => res.data);
};

// api.ts
export const fetchJobBySlug = async (slug: string) => {
  try {
    const response = await axios.get(`${API_URL}/apis/job/getByID/${slug}`);
    const jobData = response.data.data;

    if (jobData.images) {
      jobData.images = `https://bhrportal.qist.pk${jobData.images}`;
    }

    return jobData;
  } catch (error) {
    console.error("Error fetching job by slug:", error);
    throw error;
  }
};

export const getCategoryById = async (jobID: number) => {
  const token = getToken();
  if (!token) throw new Error("Authentication failed: No token found.");
  return axios
    .post(
      `${API_URL}/apis/categories/getById`,
      { jobID },
      { headers: getHeaders() }
    )
    .then((res) => res.data.data);
};

export const getAllJobs = async () => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_URL_API; // Ensure API_URL is defined
    const res = await fetch(`${API_URL}/apis/job/get`, {
      cache: "no-store", // Ensures fresh data
    });

    if (!res.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const fetchApplications = async (
  page: number,
  pageSize: number,
  jobId?: number
) => {
  try {
    const response = await axios.get(`${API_URL}/apis/application/get`, {
      params: { page, pageSize, jobId }, // Using params object for cleaner syntax
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
      { headers: getHeaders() }
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
  const token = getToken();
  console.log(token, "token");
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
  const token = getToken();
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
  const token = getToken();

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
