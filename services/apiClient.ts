import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Create an axios instance with a base configuration
const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 10000, // Timeout of 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to handle API requests with cancellation
export const apiRequest = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const response: AxiosResponse<T> = await api.request({
      method,
      url,
      data,
      signal,
      ...config,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// API Error Handler
const handleApiError = (error: any) => {
  if (axios.isCancel(error)) {
    console.warn("Request canceled:", error.message);
  } else if (error.response) {
    console.error(`API Error (${error.response.status}):`, error.response.data);
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Error occurred while making the request:", error.message);
  }
};

// Functions to handle specific request types
export const apiGet = <T>(url: string, config?: AxiosRequestConfig) =>
  apiRequest<T>("GET", url, undefined, config);

export const apiPost = <T>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig
) => apiRequest<T>("POST", url, data, config);

export const apiPut = <T>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig
) => apiRequest<T>("PUT", url, data, config);

export const apiDelete = <T>(url: string, config?: AxiosRequestConfig) =>
  apiRequest<T>("DELETE", url, undefined, config);
