import { create } from "zustand";
import { persist } from "zustand/middleware";

import axios from "axios";
import { toast } from "react-toastify";

const usePollSlice = create(
  persist(
    (set) => ({
      roomId: "",
      roomName: "",
      questions: [
        {
          question: "",
          options: [""],
          correctAnswerIndex: "",
          usersAnswer: [],
          votes: { 0: 0, 1: 0, 2: 0, 3: 0 },
        },
      ],

      // action to set room name
      setRoomName: (room) => {
        set({ roomName: room });
      },

      // action to set room id
      setRoomId: (id) => {
        set({ roomId: id });
      },

      // handling the question input
      handleQuestionInput: (value, index) => {
        set((state) => {
          let newQuestion = [...state.questions];
          newQuestion[index].question = value;
          return { questions: newQuestion };
        });
      },

      // handling the options input
      handleOptions: (value, optionIndex, questionIndex) => {
        set((state) => {
          let newQuestion = [...state.questions];
          newQuestion[questionIndex].options[optionIndex] = value;
          return { questions: newQuestion };
        });
      },

      // handling add option
      handleAddOption: (questionIndex) => {
        set((state) => {
          let newQuestion = [...state.questions];
          newQuestion[questionIndex].options.push("");
          return { questions: newQuestion };
        });
      },

      // handling delete option
      handleDeleteOption: (questionIndex, optionIndex) => {
        set((state) => {
          console.log((questionIndex, optionIndex));
          let newQuestion = [...state.questions];
          newQuestion[questionIndex].options.splice(optionIndex, 1);
          return { questions: newQuestion };
        });
      },

      // handling question delete
      handleQuestionDelete: (questionIndex) => {
        set((state) => {
          let newQuestion = [...state.questions];
          newQuestion.splice(questionIndex, 1);
          return { questions: newQuestion };
        });
      },

      // handling question add
      handleQuestionAdd: () => {
        set((state) => {
          let newQuestion = [...state.questions];
          newQuestion = [
            ...newQuestion,
            {
              question: "",
              options: [""],
              correctAnswerIndex: "",
              usersAnswer: [],
              votes: { 0: 0, 1: 0, 2: 0, 3: 0 },
            },
          ];
          return { questions: newQuestion };
        });
      },

      // handle form
      handleForm: (e) => {
        e.preventDefault();
      },
    }),
    { name: "poll" }
  )
);

export default usePollSlice;
