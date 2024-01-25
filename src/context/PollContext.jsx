import React, { useState, useContext, createContext } from "react";
import { socket } from "../socket";

export const PollContext = createContext();

export const PollProvider = ({ children }) => {
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: [""],
      correctAnswerIndex: "",
      usersAnswer: [],
      votes: { 0: 0, 1: 0, 2: 0, 3: 0 },
    },
  ]);
  const [roomId, setRoomId] = useState("");

  // handling the question input
  const handleQuestionInput = (value, index) => {
    let newQuestion = [...questions];
    newQuestion[index].question = value;
    setQuestions(newQuestion);
  };

  // handling the options input
  const handleOptions = (value, optionIndex, questionIndex) => {
    let newQuestion = [...questions];
    newQuestion[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestion);
  };

  // handling add option
  const handleAddOption = (questionIndex) => {
    let newQuestion = [...questions];
    newQuestion[questionIndex].options.push("");
    setQuestions(newQuestion);
  };

  // handle delete option
  const handleOptionDelete = (questionIndex, optionsIndex) => {
    let newQuestion = [...questions];
    newQuestion[questionIndex].options.splice(optionsIndex, 1);
    setQuestions(newQuestion);
  };

  // handle question delete
  const handleQuestionDelete = (questionIndex) => {
    let newQuestion = [...questions];
    console.log(newQuestion);
    if (questionIndex === 0) {
      setQuestions([{ question: "", options: [""] }]);
    } else {
      newQuestion.splice(questionIndex, 1);
      setQuestions(newQuestion);
    }
  };

  // handle question Add
  const handleQuestionAdd = () => {
    let newQuestion = [...questions];
    if (newQuestion[newQuestion.length - 1].question === "") {
      alert("fill the previous question in order to add the new question");
    } else {
      newQuestion = [...newQuestion, { question: "", options: [""] }];
      setQuestions(newQuestion);
    }
  };

  // handle form
  const handleForm = (e) => {
    e.preventDefault();
    // socket.emit("createRoom", roomId);
    socket.emit("createPoll", { room: roomId, questions });
  };

  return (
    <PollContext.Provider
      value={{
        questions,
        setQuestions,
        roomId,
        setRoomId,
        handleQuestionInput,
        handleOptions,
        handleAddOption,
        handleOptionDelete,
        handleQuestionDelete,
        handleQuestionAdd,
        handleForm,
      }}
    >
      {children}
    </PollContext.Provider>
  );
};

export const usePollContext = () => {
  return useContext(PollContext);
};
