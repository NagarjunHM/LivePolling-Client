import { create } from "zustand";
import { persist } from "zustand/middleware";

import axios from "axios";
import { toast } from "react-toastify";
// import axiosInstance from "../../axios/AxiosInstance";

const useUserSlice = create(
  persist(
    (set, get) => ({
      user: {},
      userLoading: false,
      userError: "",

      // reset
      resetUserSlice: () => {
        set({ user: {}, userLoading: false, userError: "" });
      },

      // user registration
      registerNewUser: async ({ name, email, password }) => {
        try {
          set({ userLoading: true });
          const response = await axios.post(
            "http://localhost:3000/api/user/register",
            {
              name,
              email,
              password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const { data, status } = response;
          if (status === 201) {
            toast.success(data);
            set({
              userError: "",
            });
            return true;
          } else {
            return false;
          }
        } catch (err) {
          set({
            userError: err.response ? err.response.data : "An error occurred",
          });
          return false;
        } finally {
          set({ userLoading: false });
        }
      },

      // user validation
      validateUser: async ({ email, password }) => {
        try {
          set({ userLoading: true });

          const response = await axios.post(
            "http://localhost:3000/api/user/login",
            { email, password },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const { data, status } = response;
          if (status === 200) {
            set({
              user: {
                email: data.email,
                token: data.token,
              },
            });
            set({
              userError: "",
            });

            toast.success("login successfull");
            return true;
          } else {
            return false;
          }
        } catch (err) {
          set({
            userError: err.response ? err.response.data : "An error occurred",
          });

          return false;
        } finally {
          set({ userLoading: false });
        }
      },

      // logout user
      userLogout: async () => {
        try {
          set({ userLoading: true });
          // const response = await axios.post(
          //   "http://localhost:3000/api/user/logout",
          //   {},
          //   {
          //     headers: {
          //       "Content-Type": "application/json",
          //       Authorization: `Bearer ${get().user.token}`,
          //     },
          //   }
          // );
          const response = await axiosInstance({
            url: "user/logout",
            method: "POST",
            data: {},
          });
          console.log(response);
          const { data, status } = response;
          if (status === 200) {
            set({ userError: "" });
            set({ user: {} });
            toast.success(data.msg);
          }
        } catch (err) {
          set({ userError: err.message });
        } finally {
          set({ userLoading: false });
        }
      },
    }),
    {
      name: "user",
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useUserSlice;
