import { create } from "zustand";
import { persist } from "zustand/middleware";

import axios from "axios";
import { toast } from "react-toastify";

const usePollSlice = create(
  persist(
    (set, get) => ({
      pollLoading: false,
      pollError: "",
      roomId: "",
      roomName: "",
      questions: [
        {
          question: "",
          options: [""],
          correctAnswerIndex: "",
          usersAnswer: [],
          votes: {},
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
              votes: {},
            },
          ];
          return { questions: newQuestion };
        });
      },

      // handle form
      handleForm: async (e) => {
        e.preventDefault();

        console.log(get().questions);
        // try {
        //   set({ pollLoading: true });
        //   const response = await axios.post(
        //     "http://localhost:3000/api/poll",
        //     { roomId: 123, roomName: "456", questions: get().questions },
        //     {
        //       headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdGVyIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTcwNjMyNzI3MywiZXhwIjoxNzA2NDEzNjczfQ.zjAPdwkHGmgDm7SvM9Q95dWoQ4s_n5hwhDFRazq6BS4}`,
        //       },
        //     }
        //   );
        //   const { data, status } = response;
        //   if (status === 200) {
        //     console.log(data);
        //   }
        // } catch (err) {
        //   console.log(err.message);
        //   set({ pollError: err.message });
        // } finally {
        //   set({ pollLoading: false });
        // }
      },

      handlePollReset: () => {
        set({
          roomId: "",
          roomName: "",
          questions: [
            {
              question: "",
              options: [""],
              correctAnswerIndex: "",
              usersAnswer: [],
              votes: {},
            },
          ],
        });
      },
    }),
    { name: "poll" }
  )
);

export default usePollSlice;
