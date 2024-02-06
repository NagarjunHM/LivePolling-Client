import React, { useEffect } from "react";
import NewPollCreation from "../components/NewPollCreation";
import PollNameInput from "../components/PollNameInput";
import { socket, generateRoomId } from "../socket";
import usePollSlice from "../store/poll/usePollSlice";
import ProgressBar from "../components/ProgressBar";

const PresenterCreate = () => {
  const { roomId, setRoomId, pollLoading } = usePollSlice();
  useEffect(() => {
    if (!roomId) {
      setRoomId(generateRoomId());
    }
  }, []);

  return (
    <div>
      {pollLoading ? <ProgressBar /> : <></>}
      <PollNameInput />
      <NewPollCreation />
    </div>
  );
};

export default PresenterCreate;
