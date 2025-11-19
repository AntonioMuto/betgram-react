import axios, { AxiosRequestConfig } from 'axios';
import store from '@/store/store';
import { addError } from '@/store/errorSlice';

/**
 * API handler for making HTTP requests.
 * @param url - The endpoint URL.
 * @param options - Axios request configuration.
 * @param onError - Optional callback for handling errors (e.g., triggering a DaisyUI alert).
 * @returns The response data or throws an error.
 */
export const apiHandler = async <T>(
  url: string,
  options?: AxiosRequestConfig,
  onError?: (message: string) => void
): Promise<T> => {
  try {
    const response = await axios({ url, ...options });

    // Check for HTTP errors
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error: any) {
    let errorMessage = 'An unexpected error occurred';

    // Handle specific HTTP errors
    if (error.response) {
      const { status } = error.response;
      if (status === 404) {
        errorMessage = 'Resource not found (404)';
      } else if (status === 500) {
        errorMessage = 'Server error (500)';
      } else {
        errorMessage = `HTTP error! status: ${status}`;
      }
    } else {
      errorMessage = `Network error: ${error.message}`;
    }

    // Trigger the onError callback if provided
    if (onError) {
      onError(errorMessage);
    }

    // Dispatch the error to Redux
    store.dispatch(addError(errorMessage));

    // Re-throw the error to handle it in the calling component
    throw new Error(errorMessage);
  }
};