import axios from "axios";

const instance = axios.create({
  baseURL: "https://livepolling.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
    timeout: 2000,
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.request.responseURL);

    if (error.response.status === 403) {
      const logoutPresent = error.request.responseURL;

      if (logoutPresent.includes("logout")) {
        window.location.href = "/presenterLogin";
        return;
      }

      alert("Token Expired, Login again...");
      window.location.href = "/presenterLogin";
    }

    return Promise.reject(error);
  }
);

export default instance;
