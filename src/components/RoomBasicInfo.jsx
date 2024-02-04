import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { BsCopy } from "react-icons/bs";

const RoomBasicInfo = ({ roomId, roomName, roomDescription }) => {
  return (
    <div className="border shadow card card-body">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div>
            Room Name : <span className="text-xl font-bold">{roomName}</span>
          </div>
          <div>
            Room Id :
            <CopyToClipboard text={roomId}>
              <div className="ml-2 cursor-default btn bg-base">
                <BsCopy />
                {roomId}
              </div>
            </CopyToClipboard>
          </div>
        </div>
        <span className="text-xl"> {roomDescription}</span>
      </div>
    </div>
  );
};

export default RoomBasicInfo;
