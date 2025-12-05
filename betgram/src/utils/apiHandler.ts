import axios, { AxiosRequestConfig } from 'axios';
import store from '@/store/store';
import { addAlert } from '@/store/errorSlice';

/**
 * Supported HTTP methods.
 */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * API handler for making HTTP requests.
 * @param url - The endpoint URL.
 * @param options - Axios request configuration.
 * @param type - HTTP method (e.g., 'GET', 'POST').
 * @param body - Request body for POST/PUT requests.
 * @param onError - Optional callback for handling errors (e.g., triggering a DaisyUI alert).
 * @returns The response data or throws an error.
 */
export const apiHandler = async <T>(
  url: string,
  options?: AxiosRequestConfig & { onError?: (error: any) => void },
  type: HttpMethod = 'GET', 
  body?: any
): Promise<T> => {
  try {
    const response = await axios({
      url,
      method: type, 
      data: body, 
      ...options,
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error: any) {
    if (options?.onError) {
      options.onError(error); 
    }
    store.dispatch(addAlert({ text: error.message, type: "error" }));
    throw error; 
  }
};