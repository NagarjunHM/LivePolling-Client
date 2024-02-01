import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user.token}`,
  },
});

export default axiosInstance;
