import { create } from "zustand";
import { persist } from "zustand/middleware";

import axios from "axios";
import { socket } from "../../socket";
import toast from "react-hot-toast";

const usePollSlice = create(
  persist(
    (set, get) => ({
      pollLoading: false,
      pollError: "",
      roomId: "",
      roomName: "",
      roomDesc: "",
      redirect: false,
      questions: [
        {
          question: "",
          options: [""],
          correctAnswerIndex: "",
          usersAnswer: [],
          votes: {},
        },
      ],
      isPollOpen: false,

      // action to set room name
      setRoomName: (room) => {
        set({ roomName: room });
      },

      // action to set room description
      setRoomDesc: (room) => {
        set({ roomDesc: room });
      },

      // action to set room id
      setRoomId: (id) => {
        set({ roomId: id });
      },

      setPollOpenClose: (value) => {
        set({ isPollOpen: value });
        console.log("isPollOpen updated:", value);
      },

      setRedirect: (value) => {
        set({ redirect: value });
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

      handleCorrectAnswer: (correctAnswerIndex, questionIndex) => {
        set((state) => {
          let newQuestions = [...state.questions];
          newQuestions[questionIndex].correctAnswerIndex = correctAnswerIndex;
          return { questions: newQuestions };
        });
      },

      // handle form
      handleForm: async (e) => {
        e.preventDefault();

        try {
          set({ pollLoading: true });
          const response = await axios.post(
            "http://localhost:3000/api/poll",
            {
              roomId: get().roomId,
              roomName: get().roomName,
              roomDesc: get().roomDesc,
              questions: get().questions,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                  JSON.parse(window.localStorage.getItem("user")).state.user
                    .token
                }`,
              },
            }
          );
          const { data, status } = response;

          if (status === 200) {
            set({ redirect: true });

            toast.success(`${data.poll.roomId} room is saved`);

            // socket.emit("createPoll", {
            //   roomId: get().roomId,
            //   questions: get().questions,
            // });

            // resetting the poll data
            set({
              roomId: "",
              roomName: "",
              roomDesc: "",
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
          }
        } catch (err) {
          set({ pollError: err.response.data });
          toast.error(err.response.data);
        } finally {
          set({ pollLoading: false });
        }
      },

      handlePollReset: () => {
        set({
          roomId: "",
          roomName: "",
          roomDesc: "",
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
