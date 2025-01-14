import axios from "axios";
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://api.saciva.in/api/v1", // Replace with your API base URL
  timeout: 70000, // Set a timeout for requests
  // withCredentials: true, // Ensure cookies are sent with requests
});

// Add a request interceptor to include the token in the headers for each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
