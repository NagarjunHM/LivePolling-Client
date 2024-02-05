import { create } from "zustand";
import { persist } from "zustand/middleware";

const useParticipantsPoll = create(
  persist(
    (set) => ({
      poll: [],
      userAnswer: [],
      participantsMsg: "Waiting for the presenter to send the poll...!",

      setPoll: (poll) => set({ poll }),
      setUserAnswer: (userAnswer) => set({ userAnswer }),
      setParticipantsMsg: (participantsMsg) => set({ participantsMsg }),
    }),
    {
      name: "participant",
      partialize: (state) => ({
        poll: state.poll,
        userAnswer: state.userAnswer,
      }),
    }
  )
);

export default useParticipantsPoll;
