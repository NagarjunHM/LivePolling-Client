import React from "react";
import NewPollCreation from "../components/NewPollCreation";
import PollNameInput from "../components/PollNameInput";

const PresenterCreate = () => {
  return (
    <div>
      <PollNameInput />
      <NewPollCreation />
    </div>
  );
};

export default PresenterCreate;
