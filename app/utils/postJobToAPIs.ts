import axios from 'axios';
import { getSession } from 'next-auth/react';

export type JobDetails = {
  title: string;
  company: string;
  description: string;
  location: string;
};

export default async function postJobToAPIs(jobDetails: JobDetails) {
  const session = await getSession();
  const { apiKeyIndeed, apiKeyLinkedIn } = (session?.user as any)?.apiKeys || {};


  if (!apiKeyIndeed || !apiKeyLinkedIn) {
    throw new Error('API keys not found');
  }

  try {
    // Post to Indeed API
    await axios.post('https://api.indeed.com/jobposting', jobDetails, {
      headers: {
        'Authorization': `Bearer ${apiKeyIndeed}`,
        'Content-Type': 'application/json',
      },
    });

    // Post to LinkedIn API
    await axios.post('https://api.linkedin.com/jobposting', jobDetails, {
      headers: {
        'Authorization': `Bearer ${apiKeyLinkedIn}`,
        'Content-Type': 'application/json',
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };

  }
}
