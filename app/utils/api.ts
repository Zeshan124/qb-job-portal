"use client";

import axios from "axios";
import useSWR from "swr";

// Base API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_URL_API || "http://192.168.18.47:4000";

// Fetch Token Once & Store in Memory
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;
const headers = token
  ? { "x-access-token": token, "Content-Type": "application/json" }
  : {};

// ✅ SWR Fetcher Function
const fetcher = (url: string) =>
  axios.get(url, { headers }).then((res) => res.data);

// ✅ Use SWR for Caching Jobs
export const useJobs = (page = 1, limit = 10) => {
  const { data, error } = useSWR(
    `${API_URL}/apis/job/get?page=${page}&limit=${limit}`,
    fetcher
  );
  return { jobs: data?.data, isLoading: !data && !error, error };
};

// ✅ Post Job
export const postJob = async (jobData: {
  jobTitle: string;
  jobDescription: string;
  location: string;
  minSalary: number;
  maxSalary: number;
  categoryID: number;
}) => {
  if (!token) throw new Error("Authentication failed: No token found.");
  return axios
    .post(`${API_URL}/apis/job/add`, jobData, { headers })
    .then((res) => res.data);
};

// ✅ Get Jobs with Pagination
export const getJobs = async (page = 1, limit = 10) => {
  return axios
    .get(`${API_URL}/apis/job/get?page=${page}&limit=${limit}`)
    .then((res) => res.data.data);
};

// ✅ Delete Job
export const deleteJob = async (jobID: number) => {
  if (!token) throw new Error("Authentication failed: No token found.");
  return axios
    .delete(`${API_URL}/apis/job/delete`, { headers, data: { jobID } })
    .then((res) => res.data);
};

// ✅ Update Job
export const updateJob = async (
  jobID: number,
  updatedJob: { jobTitle?: string; jobDescription?: string }
) => {
  if (!token) throw new Error("Authentication failed: No token found.");
  return axios
    .patch(`${API_URL}/apis/job/update`, { jobID, ...updatedJob }, { headers })
    .then((res) => res.data);
};

// ✅ Get Category By Job ID
export const getCategoryById = async (jobID: number) => {
  if (!token) throw new Error("Authentication failed: No token found.");
  return axios
    .post(`${API_URL}/apis/categories/getById`, { jobID }, { headers })
    .then((res) => res.data.data);
};

// Fetch job details by ID
export const fetchJobByID = async (jobID: number) => {
  try {
    const response = await axios.get(`${API_URL}/apis/job/getByID/${jobID}`);
    return response.data.data; // Return the job details
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    throw error;
  }
};

// ✅ Fetch All Jobs
export const getAllJobs = async () => {
  return axios
    .get(`${API_URL}/apis/job/get`)
    .then((res) => res.data.data)
    .catch((error) => {
      console.error("Error fetching jobs:", error);
      throw error;
    });
};

// ✅ Fetch Candidates List
export const getCandidates = async () => {
  return axios
    .get(`${API_URL}/apis/application/get`)
    .then((res) => res.data.data)
    .catch((error) => {
      console.error("Error fetching candidates:", error);
      throw error;
    });
};

export const getCandidateByID = async (candidateID: number) => {
  return axios
    .get(`${API_URL}/apis/application/getByID/${candidateID}`)
    .then((res) => res.data); // Ensure correct access to candidate data
};

// ✅ Update Candidate Status
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

// ✅ Download Resume
export const downloadResume = async (candidateID: number) => {
  return axios
    .get(`${API_URL}/apis/application/getByID/${candidateID}`, {
      responseType: "blob", // Important: Get binary data
    })
    .then((res) => res.data);
};
