import React, { useEffect } from "react";

import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import useUserSlice from "./store/user/useUserSlice";
import LoaderComp from "./components/LoaderComp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const userLoading = useUserSlice((state) => state.userLoading);
  return (
    <div className="flex flex-col gap-4">
      <div className="sticky top-0 z-20 ">
        <NavBar />

        {/* loader component will only be trigger for user related actions like login ,logout and registration */}
      </div>
      {userLoading ? <LoaderComp /> : <></>}
      <div className="mx-4 mb-20 ">
        <Outlet />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </div>
  );
};

export default App;
