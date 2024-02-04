import React from "react";
import usePollSlice from "../store/poll/usePollSlice";

const OpenClosePolling = () => {
  const { setPollOpenClose, isPollOpen } = usePollSlice();

  const handleOpenPoll = () => {
    setPollOpenClose(true);
  };
  const handleClosePoll = () => {
    setPollOpenClose(false);
  };
  return (
    <div className="card card-body">
      <div className="flex justify-between">
        <button
          className="btn btn-success btn-outline"
          onClick={handleOpenPoll}
          disabled={isPollOpen}
        >
          Open Polling
        </button>
        <button
          className="btn btn-error btn-outline"
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
