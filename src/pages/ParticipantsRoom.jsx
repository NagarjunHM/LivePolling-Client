import React, { useState, useEffect } from "react";
import { socket } from "../socket";
import { useParams } from "react-router-dom";

const ParticipantsRoom = () => {
  const { roomId } = useParams();
  const [poll, setPoll] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [thankYou, setThankYou] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("sendPoll", (value) => {
      setPoll(value);
    });

    socket.on("thankYou", (value) => {
      setThankYou(value);
      setPoll("");
    });

    return () => {
      socket.off("sendPoll");
    };
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
    socket.emit("userAnswer", userAnswer, roomId);
  };

  if (poll?.length === 0) {
    return (
      <div className="fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[50%] ">
        <div className="text-3xl font-light">
          waiting for Presenter to send poll...!
        </div>
      </div>
    );
  }

  if (thankYou) {
    return (
      <div className="fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[50%] ">
        <div className="text-3xl font-light">ThankYou for your response</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {poll?.map((poll, pollIndex) => (
        <div
          key={pollIndex}
          className="border shadow card card-body card-compact "
        >
          <div className="text-xl font-bold">
            <span className="mr-7">{pollIndex + 1}.</span>
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
                  <span className="text-lg label-text">{option}</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="fixed flex px-4 border btm-nav backdrop-blur">
        <div className="items-end ">
          <button
            className=" btn btn-info"
            onClick={() => {
              sendPollResponse();
            }}
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsRoom;
