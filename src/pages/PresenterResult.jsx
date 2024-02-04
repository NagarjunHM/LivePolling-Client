import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios, { all } from "axios";
import usePollSlice from "../store/poll/usePollSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "sonner";
import ProgressBar from "../components/ProgressBar";

const PresenterResult = () => {
  const [allResult, setAllResult] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllPollResult = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/poll/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(window.localStorage.getItem("user")).state.user.token
          }`,
        },
      });

      // Update the state with the fetched results
      if (response.status === 200) {
        setAllResult(response.data.reverse());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPollResult();
  }, []);

  const handleRoomDeletion = async (roomId) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:3000/api/poll/${roomId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(window.localStorage.getItem("user")).state.user.token
            }`,
          },
        }
      );

      // Update the state with the fetched results
      if (response.status === 200) {
        // setAllResult(response.data);
        toast.success("poll deleted successfully");
        fetchAllPollResult();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <>
        <ProgressBar />
        <div className="flex flex-col gap-4">
          <div className="w-full h-[111px] skeleton "></div>
          <div className="w-full h-[111px] skeleton"></div>
        </div>
      </>
    );
  }

  if (allResult.length === 0) {
    return (
      <div className="fixed top-[50%] left-[50%] -translate-x-[50%] translate-y-[50%] flex flex-col items-center gap-2">
        <div className="flex items-baseline text-3xl">No Polls Found ...!</div>
        <Link to="/presenterCreate" className="font-light link">
          create a poll
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {allResult?.map((result, resultIndex) => (
          <Link
            to={`/presenterResult/${result.roomId}`}
            className="border shadow card card-body"
            key={resultIndex}
          >
            <div className="flex justify-between gap-4">
              <div>
                <div>roomId : {result.roomId}</div>
                <div>roomName : {result.roomName}</div>
              </div>
              <button
                className="text-red-500 btn btn-ghost"
                onClick={(e) => {
                  e.preventDefault();
                  handleRoomDeletion(result.roomId);
                }}
              >
                <AiOutlineDelete size="2rem" />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default PresenterResult;

export const handleRedirect = () => {};
