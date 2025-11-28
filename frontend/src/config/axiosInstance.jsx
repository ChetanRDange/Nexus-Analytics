import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL, // Your API base URL
  withCredentials: true,
});
export default axiosInstance;
