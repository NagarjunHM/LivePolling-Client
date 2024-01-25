import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserSlice from "../store/user/useUserSlice";

const ProtectedRoute = ({ children }) => {
  const user = useUserSlice((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.token) {
      navigate("/presenterLogin");
    }
  }, [user]);

  // Render the children when the user is authenticated
  return user.token ? <>{children}</> : null;
};

export default ProtectedRoute;
