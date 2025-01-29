import axios from "axios";

export type JobDetails = {
  title: string;
  company: string;
  description: string;
  location: string;
};

export default async function postJobToAPIs(jobDetails: JobDetails) {
  try {
    // Post to your backend API
    const response = await axios.post("http://localhost:4000/apis/job/add", jobDetails, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response indicates success
    if (response.status === 201 || response.status === 200) {
      return { success: true };
    } else {
      return { success: false, error: `Unexpected status code: ${response.status}` };
    }
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
