import React, { useState, useEffect } from "react";
import { socket } from "../socket";
import { useParams } from "react-router-dom";

const ParticipantsRoom = () => {
  const { roomId } = useParams();
  const [poll, setPoll] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("sendPoll", (value) => {
      console.log(value);
      setPoll(value);
    });
  }, []);

  // function to save the selected option
  const handleOptionChange = (pollIndex, optionIndex) => {
    // Check if there's already an answer for the current pollIndex
    const existingAnswerIndex = userAnswer.findIndex(
      (answer) => answer.pollIndex === pollIndex
    );

    if (existingAnswerIndex !== -1) {
      // If an answer for the current pollIndex exists, update the optionIndex
      setUserAnswer((prevUserAnswer) => {
        const updatedUserAnswer = [...prevUserAnswer];
        updatedUserAnswer[existingAnswerIndex].optionIndex = optionIndex;
        return updatedUserAnswer;
      });
    } else {
      // If not, add the new answer
      setUserAnswer((prevUserAnswer) => {
        // Check if there's already an entry with the same pollIndex
        const duplicatePollIndexIndex = prevUserAnswer.findIndex(
          (answer) => answer.pollIndex === pollIndex
        );

        if (duplicatePollIndexIndex !== -1) {
          // If found, replace the existing entry
          prevUserAnswer[duplicatePollIndexIndex].optionIndex = optionIndex;
          return [...prevUserAnswer];
        } else {
          // If not found, add a new entry
          return [...prevUserAnswer, { pollIndex, optionIndex }];
        }
      });
    }
  };

  // function to send the selected poll
  const sendPollResponse = () => {
    console.log(userAnswer);
    socket.emit("userAnswer", poll, userAnswer, roomId);
  };

  return (
    <div className="flex flex-col gap-4">
      {poll.map((poll, pollIndex) => (
        <div key={pollIndex} className="card card-body bg-base-300 ">
          <div className="text-2xl">
            <span className="mr-7">{pollIndex + 1}</span>
            {poll.question}
          </div>

          {/* looping through options */}
          {poll.options.map((option, optionIndex) => (
            <div key={optionIndex} className="items-start card-actions ">
              <div className="form-control">
                <label className="flex gap-4 cursor-pointer label">
                  <input
                    type="radio"
                    name={pollIndex}
                    onChange={() => {
                      handleOptionChange(pollIndex, optionIndex);
                    }}
                    className="radio"
                  />
                  <span className="text-xl label-text">Remember me</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="fixed flex px-4 bg-blue-500 btm-nav backdrop-blur">
        <div className="items-end ">
          <button className=" btn btn-warning" onClick={sendPollResponse}>
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsRoom;
