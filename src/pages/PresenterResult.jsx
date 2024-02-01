import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PresenterResult = () => {
  const [allResult, setAllResult] = useState([]);

  useEffect(() => {
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
          setAllResult(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    // Call the fetch function
    fetchAllPollResult();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        {allResult.map((result, resultIndex) => (
          <Link
            to={`/presenterResult/${result.roomId}`}
            className="card card-body bg-base-300"
            key={resultIndex}
          >
            <div className="flex gap-4">
              <div>roomId : {result.roomId}</div>
              <div>roomName : {result.roomName}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default PresenterResult;
