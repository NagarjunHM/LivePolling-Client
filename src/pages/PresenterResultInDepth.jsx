import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import axios from "axios";
import RoomBasicInfo from "../components/RoomBasicInfo";
import ResultDisplay from "../components/ResultDisplay";
import OpenClosePolling from "../components/OpenClosePolling";
import LoaderComp from "../components/LoaderComp";
import usePollSlice from "../store/poll/usePollSlice";
import ProgressBar from "../components/ProgressBar";

const PresenterResultInDepth = () => {
  const { roomId } = useParams();
  const [allResult, setAllResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isPollOpen, setPollOpenClose } = usePollSlice();

  useEffect(() => {
    const fetchSpecificPoll = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
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
          setAllResult(response.data);
          console.log(response.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecificPoll();

    // // Join the room
    // socket.emit("joinRoom", roomId);

    // Listen for socket updates
    socket.on("updatedWithUserAns", async ({ reload }) => {
      if (reload) {
        fetchSpecificPoll();
      }
    });

    // Cleanup socket listeners when the component unmounts
    return () => {
      setPollOpenClose(false);
      socket.emit("closeRoom", roomId);
      socket.off("updatedWithUserAns");
    };
  }, []);

  // if poll is open then create a room and send the questions
  if (isPollOpen) {
    socket.emit("createRoom", roomId);

    socket.emit("createPoll", {
      roomId,
      questions: allResult.questions,
    });
  }
  if (!isPollOpen) {
    socket.emit("closeRoom", roomId);
  }

  // loader compoenent
  if (loading) {
    return (
      <>
        <ProgressBar />
        <div className="flex flex-col gap-4">
          <div className="w-full h-[156px] skeleton"></div>
          <div className="w-full h-[112px] skeleton"></div>
          <div className="w-full h-[443px] skeleton"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <RoomBasicInfo
          roomId={roomId}
          roomName={allResult.roomName}
          roomDescription="this is a simple room description "
        />
        <OpenClosePolling />
        <ResultDisplay questions={allResult.questions} />
      </div>
    </>
  );
};

export default PresenterResultInDepth;
