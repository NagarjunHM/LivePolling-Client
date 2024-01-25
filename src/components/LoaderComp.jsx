import React from "react";

const LoaderComp = () => {
  return (
    <div className="fixed top-0 flex items-center justify-center size-full">
      <span className="text-green-200 loading loading-ball loading-lg"></span>
      <span className="text-green-400 loading loading-ball loading-lg"></span>
      <span className="text-green-600 loading loading-ball loading-lg"></span>
      <span className="text-green-800 loading loading-ball loading-lg"></span>
    </div>
  );
};

export default LoaderComp;
