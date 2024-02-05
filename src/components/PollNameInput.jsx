import React, { useEffect } from "react";
import usePollSlice from "../store/poll/usePollSlice";
import { generateRoomId } from "../socket";
import { BsCopy } from "react-icons/bs";
import CopyToClipboard from "react-copy-to-clipboard";

const PollNameInput = () => {
  const { setRoomName, roomName, roomId, setRoomId, roomDesc, setRoomDesc } =
    usePollSlice();

  useEffect(() => {}, []);

  // onchange function to handle room name input
  const handleRoomInput = (e) => {
    setRoomName(e.target.value);
  };

  // onchange function to handle room description input
  const handleDescInput = (e) => {
    setRoomDesc(e.target.value);
  };

  // function to handle regenerate roomId
  const handleRoomIdRegenrate = () => {
    setRoomId(generateRoomId());
  };

  return (
    <div className="flex gap-4 border shadow card card-body">
      <div className="flex items-center gap-2">
        <div>Your Room Id :</div>
        <CopyToClipboard text={roomId}>
          <div className="mr-4 cursor-default btn bg-base">{roomId}</div>
        </CopyToClipboard>
        <button className="btn btn-neutral" onClick={handleRoomIdRegenrate}>
          regenerate
        </button>
      </div>
      <div className="flex flex-row items-end gap-4 ">
        <div className="flex-grow">
          <div className="label">
            <span className="label-text">Enter your Room Name</span>
          </div>
          <input
            type="text"
            placeholder="Enter room name"
            className="w-full input input-bordered"
            onChange={handleRoomInput}
            value={roomName}
          ></input>
        </div>
      </div>
      <div className="label">
        <span className="label-text">Enter your Room Description</span>
      </div>
      <textarea
        className="h-24 text-xl textarea textarea-bordered"
        placeholder="Enter description about the room"
        onChange={handleDescInput}
        value={roomDesc}
      ></textarea>
    </div>
  );
};

export default PollNameInput;
