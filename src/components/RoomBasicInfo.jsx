import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { BsCopy } from "react-icons/bs";

const RoomBasicInfo = ({ roomId, roomName, roomDescription }) => {
  return (
    <div className="border shadow card card-body card-compact ">
      <div className="card-title">Room Name : {roomName}</div>
      <div>
        Room Id :
        <CopyToClipboard text={roomId}>
          <div
            className="ml-2 cursor-default btn bg-base"
            onClick={() =>
              // alert();
              toast.success(`${roomId} copied successfully`)
            }
          >
            <BsCopy />
            {roomId}
          </div>
        </CopyToClipboard>
      </div>

      <div className="font-light">Description : {roomDescription}</div>
    </div>
  );
};

export default RoomBasicInfo;
