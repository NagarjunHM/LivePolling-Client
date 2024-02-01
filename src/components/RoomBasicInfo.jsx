import React from "react";

const RoomBasicInfo = ({ roomId, roomName, roomDescription }) => {
  return (
    <div className="card card-body bg-base-300">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div>
            Room Id : <span className="text-xl font-bold">{roomName}</span>
          </div>
          <div>
            Room Name : <span className="text-xl font-bold">{roomId}</span>
          </div>
        </div>
        <span className="text-xl"> {roomDescription}</span>
      </div>
    </div>
  );
};

export default RoomBasicInfo;
