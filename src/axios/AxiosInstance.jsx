import axios from "axios";
import useUserSlice from "../store/user/useUserSlice";

// Inside a functional component or another function
const AxiosInstance = () => {
  const { user } = useUserSlice();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });

  return <></>;
};

// export default AxiosInstance;
