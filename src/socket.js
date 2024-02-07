import { io } from "socket.io-client";

const URL = "https://livepolling-client.onrender.com";

export const socket = io(URL, { withCredentials: true });

// function to generate random 8 character room code
export const generateRoomId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let roomId = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    roomId += characters.charAt(randomIndex);
  }

  return roomId;
};
