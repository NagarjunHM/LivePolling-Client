import React from "react";

const LoaderComp = () => {
  return (
    <div className="fixed z-40 flex items-center justify-center bg-white bg-opacity-50 border size-full">
      <span className="text-green-500 loading loading-ball loading-lg"></span>
      <span className="text-green-500 loading loading-ball loading-lg"></span>
      <span className="text-green-500 loading loading-ball loading-lg"></span>
      <span className="text-green-500 loading loading-ball loading-lg"></span>
    </div>
  );
};

export default LoaderComp;
