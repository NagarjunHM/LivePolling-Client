import React from "react";
import usePollSlice from "../store/poll/usePollSlice";
import toast from "react-hot-toast";

const OpenClosePolling = () => {
  const { setPollOpenClose, isPollOpen } = usePollSlice();

  const handleOpenPoll = () => {
    setPollOpenClose(true);
    toast.success("poll is open");
  };
  const handleClosePoll = () => {
    setPollOpenClose(false);
    toast.success("poll is closed");
  };
  return (
    <div className="border shadow card card-body card-compact">
      <div className="flex justify-between">
        <button
          className="btn btn-success"
          onClick={handleOpenPoll}
          disabled={isPollOpen}
        >
          Open Polling
        </button>
        <button
          className="btn btn-error"
          onClick={handleClosePoll}
          disabled={!isPollOpen}
        >
          Close Polling
        </button>
      </div>
    </div>
  );
};

export default OpenClosePolling;
