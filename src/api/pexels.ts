import axios, { AxiosError } from 'axios'; 
import { PexelsSearchResponse } from '../types';

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const BASE_URL = 'https://api.pexels.com/v1';

if (!API_KEY) {
  console.error("Pexels API Key not found. Make sure VITE_PEXELS_API_KEY is set in your.env file.");
}

interface SearchParams {
  query: string;
  page?: number;
  per_page?: number;
}

export const searchPexelsImages = async ({
  query,
  page = 1,
  per_page = 15, 
}: SearchParams): Promise<PexelsSearchResponse> => {
  if (!API_KEY) {
    throw new Error("Pexels API Key is missing.");
  }
  if (!query) {
      return { photos:[], page, per_page, total_results: 0 };
  }

  const url = `${BASE_URL}/search`; 

  try {
    const response = await axios.get<PexelsSearchResponse>(url, {
      headers: {
        Authorization: API_KEY,
      },
      params: { 
        query: query, 
        page: page,
        per_page: per_page,
      }
    });
    return response.data;

  } catch (error: any) {
    // Enhanced error handling for Axios
    if (axios.isAxiosError(error)) { 
      const axiosError = error as AxiosError;
      console.error(`Pexels API Error: ${axiosError.response?.status} ${axiosError.response?.statusText}`);
      const errorDetails = axiosError.response?.data as any; 
      const errorMessage = errorDetails?.error || axiosError.message ||  'Failed to fetch images from Pexels';
      throw new Error(errorMessage);
    } else {
      console.error("Error during Pexels API call setup:", error);
      throw error; 
    }
  }
};