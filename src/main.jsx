import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Participants from "./pages/Participants.jsx";
import ParticipantsRoom from "./pages/ParticipantsRoom.jsx";
import PresenterCreate from "./pages/PresenterCreate.jsx";
import PresenterResult from "./pages/PresenterResult.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import UserSelection from "./pages/UserSelection.jsx";
import PresenterLogin from "./pages/PresenterLogin.jsx";
import PresenterRegistration from "./pages/PresenterRegistration.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <UserSelection />,
      },
      {
        path: "presenterLogin",
        element: <PresenterLogin />,
      },
      {
        path: "presenterRegistration",
        element: <PresenterRegistration />,
      },
      {
        path: "presenterCreate",
        element: (
          <ProtectedRoute>
            <PresenterCreate />
          </ProtectedRoute>
        ),
      },
      {
        path: "presenterResult",
        element: (
          <ProtectedRoute>
            <PresenterResult />
          </ProtectedRoute>
        ),
      },
      {
        path: "participants",
        element: <Participants />,
      },
      {
        path: "participants/:roomId",
        element: <ParticipantsRoom />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
