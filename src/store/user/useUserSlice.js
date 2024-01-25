import { create } from "zustand";
import { persist } from "zustand/middleware";

import axios from "axios";

const useUserSlice = create(
  persist(
    (set, get) => ({
      user: {},
      userLoading: false,
      userError: "",

      // validate user
      validateUser: async ({ email, password }) => {
        try {
          set({ userLoading: true });

          const response = await axios.post(
            "http://localhost:3000/api/user/login",
            { email, password },
            {
              withCredentials: true,
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

            return true;
          } else {
            return false;
          }
        } catch (err) {
          set({ userError: err.message });

          return false;
        } finally {
          set({ userLoading: false });
        }
      },

      // logout user
      userLogout: async () => {
        const response = await axios.post(
          "http://localhost:3000/api/user/logout",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${get().user.token}`,
            },
          }
        );
        const { data, status } = response;
        if (status === 200) {
          set({ userLoading: false });
          set({ userError: "true" });
          set({ user: {} });
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
