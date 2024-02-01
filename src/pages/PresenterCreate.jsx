import React, { useEffect } from "react";
import NewPollCreation from "../components/NewPollCreation";
import PollNameInput from "../components/PollNameInput";
import { socket, generateRoomId } from "../socket";
import usePollSlice from "../store/poll/usePollSlice";

const PresenterCreate = () => {
  const { roomId, setRoomId } = usePollSlice();
  useEffect(() => {
    if (!roomId) {
      setRoomId(generateRoomId());
    }
    // socket.emit("createRoom", roomId);
  }, []);
  return (
    <div>
      <PollNameInput />
      <NewPollCreation />
    </div>
  );
};

export default PresenterCreate;
