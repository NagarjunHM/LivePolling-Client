import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
    timeout: 2000,
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response.data);
    if (error.response.status === 403) {
      alert("Token Expired, Login again...");
      window.location.href = "/presenterLogin";
    }

    return Promise.reject(error);
  }
);

export default instance;
