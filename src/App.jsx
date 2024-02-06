import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import useUserSlice from "./store/user/useUserSlice";
import LoaderComp from "./components/LoaderComp";
import { Toaster } from "react-hot-toast";

const App = () => {
  const userLoading = useUserSlice((state) => state.userLoading);
  return (
    <div className="flex flex-col gap-4 antialiased bg-blue-100/10">
      <div className="sticky top-0 z-20 ">
        <NavBar />

        {/* loader component will only be trigger for user related actions like login ,logout and registration */}
      </div>
      {userLoading ? <LoaderComp /> : <></>}
      <div className="mx-4 mb-20 ">
        <Outlet />
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          // Define default options
          className: "py-4 px-6",
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default App;
