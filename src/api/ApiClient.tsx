import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const onRequest = (config: InternalAxiosRequestConfig) => {
  return config;
};

const onResponse = (response: AxiosResponse) => {
  if (response && response.data) {
    return response.data;
  }
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.log(error.response);
  console.log(error.request.status);
  return Promise.reject(error);
};

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
});
apiClient.interceptors.request.use(onRequest);
apiClient.interceptors.response.use(onResponse, onResponseError);

apiClient.defaults.timeout = 30000;

export default apiClient;
