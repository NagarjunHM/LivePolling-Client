import React, { useState, useEffect } from "react";
import { socket } from "../socket";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ParticipantsRoom = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [poll, setPoll] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [participantsMsg, setParticipantsMsg] = useState(
    "Waiting for the presenter to send the poll...!"
  );

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    const handlePoll = (value) => setPoll(value);

    socket.on("sendPoll", handlePoll);

    return () => {
      socket.off("sendPoll", handlePoll);
    };
  }, [roomId]);

  useEffect(() => {
    const handleThankYou = (value) => {
      setParticipantsMsg(value);
      setPoll([]);

      setTimeout(() => {
        navigate("/participants");
      }, 3000);
    };

    const handleCloseRoom = (value) => {
      setParticipantsMsg(value);
      setPoll([]);
      setTimeout(() => {
        navigate("/participants");
      }, 3000);
    };

    socket.on("thankYou", handleThankYou);
    socket.on("closingRoom", handleCloseRoom);

    return () => {
      socket.off("thankYou", handleThankYou);
      socket.off("closingRoom", handleCloseRoom);
    };
  }, [poll]);

  const handleOptionChange = (pollIndex, optionIndex) => {
    const existingAnswerIndex = userAnswer.findIndex(
      (answer) => answer.pollIndex === pollIndex
    );

    setUserAnswer((prevUserAnswer) => {
      const updatedUserAnswer = [...prevUserAnswer];

      if (existingAnswerIndex !== -1) {
        updatedUserAnswer[existingAnswerIndex].optionIndex = optionIndex;
      } else {
        updatedUserAnswer.push({ pollIndex, optionIndex });
      }

      return updatedUserAnswer;
    });
  };

  const sendPollResponse = () => {
    socket.emit("userAnswer", userAnswer, roomId);
  };

  if (poll?.length === 0) {
    return (
      <div className="fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[50%] ">
        <div className="text-3xl font-light">{participantsMsg}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {poll?.map((poll, pollIndex) => (
        <div
          key={pollIndex}
          className="border shadow card card-body card-compact"
        >
          <div className="text-xl font-bold">
            <span className="mr-7">{pollIndex + 1}.</span>
            {poll.question}
          </div>

          {poll.options.map((option, optionIndex) => (
            <div key={optionIndex} className="items-start card-actions">
              <div className="form-control">
                <label className="flex gap-4 cursor-pointer label">
                  <input
                    type="radio"
                    name={pollIndex}
                    onChange={() => handleOptionChange(pollIndex, optionIndex)}
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
        <div className="items-end">
          <button
            className="btn btn-info"
            onClick={sendPollResponse}
            disabled={userAnswer.length === 0}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsRoom;
