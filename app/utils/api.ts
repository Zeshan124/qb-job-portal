"use client";

import axios from "axios";

// Base API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_URL_API || "http://192.168.18.47:4000";

// Retrieve token from localStorage
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token"); // Fetch from localStorage
  }
  return null;
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

export const getJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/apis/job/get`);
    return response.data.data; // Return job data array
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

// Delete Job API
export const deleteJob = async (jobID: number) => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    console.log("Using Token for DELETE API:", token);
    console.log("Deleting Job with ID:", jobID);

    if (!token) {
      throw new Error("Authentication failed: No token found.");
    }

    const response = await axios.delete(`${API_URL}/apis/job/delete`, {
      headers: {
        "x-access-token": token, // Send token here
        "Content-Type": "application/json",
      },
      data: { jobID }, // Ensure jobID is sent in the body
    });

    console.log("Job deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting job:",
      (error as { response?: { data?: string } })?.response?.data ||
        (error as Error).message
    );
    throw error;
  }
};

// Update Job API
export const updateJob = async (
  jobID: number,
  updatedJob: { jobTitle?: string; jobDescription?: string }
) => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    console.log("Using Token for PATCH API:", token); // Debugging

    if (!token) {
      throw new Error("Authentication failed: No token found.");
    }

    const response = await axios.patch(
      `${API_URL}/apis/job/update`,
      { jobID, ...updatedJob }, // Payload
      {
        headers: {
          "x-access-token": token, // Use x-access-token header
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Job updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating job:",
      (error as { response?: { data?: string } })?.response?.data ||
        (error as Error).message
    );

    throw error;
  }
};

export const getCategoryById = async (jobID: number) => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    console.log("Using Token for GET BY ID API:", token);
    console.log("Fetching category for Job ID:", jobID);

    if (!token) {
      throw new Error("Authentication failed: No token found.");
    }

    const response = await axios.post(
      `${API_URL}/apis/categories/getById`,
      { jobID }, // Payload
      {
        headers: {
          "x-access-token": token, // Send token
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Category fetched successfully:", response.data);
    return response.data.data; // Return the category data
  } catch (error) {
    console.error(
      "Error fetching category:",
      (error as { response?: { data?: string } })?.response?.data ||
        (error as Error).message
    );
    throw error;
  }
};

export const fetchJobById = async (jobID: number) => {
  try {
    const response = await axios.post(`${API_URL}/apis/categories/getById`, {
      jobID,
    });
    return response.data.data; // Return job details
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    throw error;
  }
};

export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/apis/job/get`);
    return response.data.data; // Return array of jobs
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

// Post Job API Call
// export const postJob = async (jobData: any) => {
//   try {
//     const token = getToken();

//     if (!token) {
//       throw new Error("No authentication token found. Please log in.");
//     }

//     const response = await axios.post(`${API_URL}/apis/job/add`, jobData, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Use Bearer Token Authentication
//         "Content-Type": "application/json",
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error posting job:", error);
//     throw error;
//   }
// };
