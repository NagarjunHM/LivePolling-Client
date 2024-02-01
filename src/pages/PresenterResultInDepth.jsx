import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import axios from "axios";
import RoomBasicInfo from "../components/RoomBasicInfo";
import ResultDisplay from "../components/ResultDisplay";
import OpenClosePolling from "../components/OpenClosePolling";
import LoaderComp from "../components/LoaderComp";

const PresenterResultInDepth = () => {
  const { roomId } = useParams();
  const [allResult, setAllResult] = useState([]);
  const [loading, setLoading] = useState(true);

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

    // // Join the room
    // socket.emit("joinRoom", roomId);

    // // Listen for socket updates
    // socket.on("updatedWithUserAns", async ({ reload }) => {
    //   if (reload) {
    //     fetchSpecificPoll();
    //   }
    // });

    // Cleanup socket listeners when the component unmounts
    // return () => {
    //   socket.off("updatedWithUserAns");
    // };

    fetchSpecificPoll();
  }, []);

  return (
    <>
      {!loading ? (
        <div className="flex flex-col gap-4">
          <RoomBasicInfo
            roomId={roomId}
            roomName={allResult.roomName}
            roomDescription="this is a simple room description "
          />
          <OpenClosePolling />
          <ResultDisplay questions={allResult.questions} />
        </div>
      ) : (
        <LoaderComp />
      )}
    </>
  );
};

export default PresenterResultInDepth;
