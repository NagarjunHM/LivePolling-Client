import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import ProgressBar from "../components/ProgressBar";
import instance from "../axios/axios";
import useUserSlice from "../store/user/useUserSlice";

const PresenterResult = () => {
  const [allResult, setAllResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserSlice();

  const fetchAllPollResult = async () => {
    try {
      const response = await instance({
        url: "poll/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      // Update the state with the fetched results
      if (response.status === 200) {
        setAllResult(response.data.reverse());
        console.log(response.data);
      }
    } catch (err) {
      toast.error("failed to fetch polls");
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

      const response = await instance({
        url: `poll/${roomId}`,
        method: "Delete",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      // Update the state with the fetched results
      if (response.status === 200) {
        // setAllResult(response.data);
        toast.success("poll deleted successfully");
        fetchAllPollResult();
      }
    } catch (err) {
      console.log(err);
      toast.error("poll deletion failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <ProgressBar />
        <div className="flex flex-col gap-4">
          <div className="w-full h-[197px] skeleton card card-body">
            <div className="h-12 skeleton"></div>
            <div className="h-10 skeleton"></div>
            <div className="w-full h-10 skeleton"></div>
          </div>
          <div className="w-full h-[197px] skeleton card card-body">
            <div className="h-12 skeleton"></div>
            <div className="h-10 skeleton"></div>
            <div className="w-full h-10 skeleton"></div>
          </div>
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
            className="border shadow card card-body bg-violet-100/50 card-compact"
            key={resultIndex}
          >
            <div className="card-title">Room Name : {result.roomName}</div>

            <div>
              <div>
                Room Id :
                <div className="ml-2 cursor-default btn bg-base">
                  {result.roomId}
                </div>
              </div>
            </div>

            <div className="font-light">Description : {result.roomDesc}</div>

            <button
              className="absolute top-0 right-0 m-5 text-red-500 btn btn-ghost"
              onClick={(e) => {
                e.preventDefault();
                handleRoomDeletion(result.roomId);
              }}
            >
              <AiOutlineDelete size="2rem" />
            </button>
          </Link>
        ))}
      </div>
    </>
  );
};

export default PresenterResult;

export const handleRedirect = () => {};
