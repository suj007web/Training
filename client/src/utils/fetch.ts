import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";

import { APIResponse } from "@/src/interfaces/reponses";




interface FetcherOptions<TRequest = unknown> {
  url: string;
  method?: Method;
  headers?: Record<string, string>;
  body?: TRequest;
  credentials?: boolean;
  onError?: (error: { message: string; status?: number }) => void;
  onRedirect?: (location: string, status: number) => void;
}

interface FetcherResponse<TResponse> {
  data?: TResponse;
  error?: string;
  status?: number;
}


export async function _fetch<TResponse = unknown, TRequest = unknown>(
  options: FetcherOptions<TRequest>
): Promise<FetcherResponse<TResponse>> {
  const {
    url,
    method = 'GET',
    headers,
    body,
    credentials = false,
    onError,
    onRedirect,
  } = options;

  const config: AxiosRequestConfig = {
    url,
    method,
    headers,
        withCredentials: credentials,
    ...(method !== 'GET' && method !== 'HEAD' ? { data: body } : {}),
  };

  try {
    const response: AxiosResponse<APIResponse<TResponse>> = await axios(config);
    const result = response.data;

    if (result.status === 'error') {
      const msg = result.error || result.message || 'Unknown error';
      onError?.({ message: msg, status: response.status });
      return { error: msg, status: response.status };
    }

    return { data: result.data, status: response.status };
  } catch (err) {
    const error = err as AxiosError;
    const status = error.response?.status;


    if (status === 401 || status === 403) {
      onRedirect?.('/login', status); 
    }

    const msg =
      (error.response?.data as APIResponse<unknown>)?.error ||
      error.message ||
      'Request failed';

    onError?.({ message: msg, status });

    return { error: msg, status };
  }
}
