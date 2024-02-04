import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import useUserSlice from "../store/user/useUserSlice";
import usePollSlice from "../store/poll/usePollSlice";

const NavBar = () => {
  const location = useLocation();
  const { user, userLogout } = useUserSlice();
  const { handlePollReset, isPollOpen } = usePollSlice();

  return (
    <>
      <div className="shadow navbar backdrop-blur-lg">
        <div className="flex-grow">
          <p className="text-2xl font-medium cursor-default">
            <span className="text-green-500">Live</span>Polling
          </p>

          {/* cond rendering for home link */}
          {location.pathname === "/" ||
          location.pathname === "/presenterLogin" ||
          location.pathname === "/presenterRegistration" ? (
            <ul className="px-1 menu menu-horizontal">
              <li className="px-1">
                <NavLink to="/">Home</NavLink>
              </li>
            </ul>
          ) : (
            <></>
          )}
        </div>

        {/* cond rendering for login and register link */}
        {location.pathname === "/presenterLogin" ||
        location.pathname === "/presenterRegistration" ? (
          <div className="flex-0">
            <div className="flex-none">
              <ul className="px-1 menu menu-horizontal">
                <li>
                  <NavLink to="/presenterLogin">Login</NavLink>
                </li>
                &nbsp;
                <li>
                  <NavLink to="/presenterRegistration">Register</NavLink>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* logout create,result */}
        {location.pathname.startsWith("/presenterCreate") ||
        location.pathname.startsWith("/presenterResult") ? (
          <>
            <div className="flex-grow">
              <ul className="px-1 menu menu-horizontal">
                <li className="px-1">
                  <NavLink to="/presenterResult">Polls</NavLink>
                </li>
                <li className="px-1">
                  <NavLink to="/presenterCreate">Create</NavLink>
                </li>
              </ul>
            </div>
            <div className="gap-4 flex-0">
              <button className="relative btn ">
                {user.email}
                <div
                  className={`absolute w-3 h-3 ${
                    isPollOpen ? "bg-green-500" : "bg-red-500"
                  } rounded-full top-[-5px] right-[-5px]`}
                ></div>
              </button>

              <button
                className="btn btn-outline btn-error"
                onClick={() => {
                  userLogout();
                  handlePollReset();
                }}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default NavBar;
