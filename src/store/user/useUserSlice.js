import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import instance from "../../axios/axios";

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

          const response = await instance({
            url: "user/register",
            method: "POST",
            data: { name, email, password },
          });

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
          console.log(err.response.data);
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

          const response = await instance({
            url: "user/login",
            method: "POST",
            data: { email, password },
          });

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

          const response = await instance({
            url: "user/logout",
            method: "POST",
            headers: {
              Authorization: `Bearer ${get().user.token}`,
            },
          });

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
