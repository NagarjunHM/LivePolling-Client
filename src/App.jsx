import React from "react";

import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="sticky top-0 z-20 ">
        <NavBar />
      </div>
      <div className="mx-4 mb-20">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
