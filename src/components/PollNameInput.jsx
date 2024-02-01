import React, { useEffect } from "react";
import usePollSlice from "../store/poll/usePollSlice";
import { generateRoomId } from "../socket";

const PollNameInput = () => {
  const { setRoomName, roomName, roomId, setRoomId } = usePollSlice();

  useEffect(() => {}, []);

  // onchange function to handle room name input
  const handleRoomInput = (e) => {
    setRoomName(e.target.value);
  };

  // to save room name and disable the room name input field
  const handleSaveRoomName = () => {
    setRoomName(roomName);
  };

  // function to handle regenerate roomId
  const handleRoomIdRegenrate = () => {
    setRoomId(generateRoomId());
  };

  return (
    <div className="flex gap-4 card card-body bg-base-200">
      <div className="flex flex-row items-end gap-4 ">
        <div className="flex-grow">
          <div className="label">
            <span className="label-text">Enter your room name</span>
          </div>
          <input
            type="text"
            className="w-full input input-bordered"
            onChange={handleRoomInput}
            value={roomName}
          ></input>
        </div>
        <button className="btn btn-outline" onClick={handleSaveRoomName}>
          Save Name
        </button>
      </div>
      <div className="flex items-center ">
        <div>Your room id :</div>
        <div className="mr-4 cursor-default badge badge-lg bg-base">
          {roomId}
        </div>
        <button className="btn btn-neutral" onClick={handleRoomIdRegenrate}>
          regenerate
        </button>
      </div>
    </div>
  );
};

export default PollNameInput;
