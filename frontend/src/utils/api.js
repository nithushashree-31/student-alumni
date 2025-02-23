import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

const API = {
  get: (path, config = {}) => axiosInstance.get(path, config),
  post: (path, data, config = {}) => axiosInstance.post(path, data, config),
  patch: (path, data, config = {}) => axiosInstance.patch(path, data, config),
  put: (path, data, config = {}) => axiosInstance.put(path, data, config),
  delete: (path, config = {}) => axiosInstance.delete(path, config),
};

export default API;
