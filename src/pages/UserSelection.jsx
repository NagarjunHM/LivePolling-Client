import React from "react";
import { Link } from "react-router-dom";

const UserSelection = () => {
  return (
    <div className="absolute top-0 left-0 min-h-screen overflow-auto hero bg-base-200">
      <div className="text-center ">
        <h1 className="mb-8 text-4xl font-medium">
          <span className="text-6xl text-green-600">Welcome</span> to{" "}
          <span className="p-1 border-b-4 border-purple-500 rounded-sm">
            LivePolling
          </span>
        </h1>
        <p className="mb-2 text-2xl font-medium">
          Engage your audience in real-time polls and gather valuable insights.
        </p>
        <p className="mb-8 text-xl font-medium">
          Ready to make your events interactive? Choose your role and get
          started!
        </p>
        <div className="flex flex-row justify-center mb-8">
          <Link to="/presenterLogin" className="btn btn-neutral">
            Be a Presenter
          </Link>
          <div className="divider">OR</div>
          <Link to="participants" className="btn btn-neutral">
            Join as a Participant
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
