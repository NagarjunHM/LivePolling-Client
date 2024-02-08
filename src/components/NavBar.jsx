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
      <div className="shadow backdrop-blur navbar">
        <div className="flex-grow">
          <p className="text-2xl font-medium cursor-default">
            <span className="text-green-500">Live</span>Polling
          </p>

          {/* cond rendering for home link */}
          {location.pathname === "/" ||
          location.pathname === "/presenterLogin" ||
          location.pathname === "/presenterRegistration" ||
          location.pathname === "/participants" ? (
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
          <>
            {/* big screen */}
            <div className="hidden md:flex">
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

            {/* small screen */}
            <div className="block md:hidden">
              <div className="dropdown dropdown-bottom dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
                >
                  <li className="px-1 m-1">
                    <NavLink to="/presenterLogin">Login</NavLink>
                  </li>
                  <li className="px-1 m-1">
                    <NavLink to="/presenterRegistration">Register</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* logout create,result */}
        {location.pathname.startsWith("/presenterCreate") ||
        location.pathname.startsWith("/presenterResult") ? (
          <>
            {/* big screen */}
            <>
              <div className="flex-grow hidden md:flex">
                <ul className="px-1 menu menu-horizontal">
                  <li className="px-1">
                    <NavLink to="/presenterResult">Polls</NavLink>
                  </li>
                  <li className="px-1">
                    <NavLink to="/presenterCreate">Create</NavLink>
                  </li>
                </ul>
              </div>
              <div className="hidden gap-4 md:flex">
                <button className="relative btn ">
                  {user.email}
                  <div
                    className={`absolute w-3 h-3 ${
                      isPollOpen ? "bg-green-500" : "bg-red-500"
                    } rounded-full top-[-4px] right-[5px]`}
                  ></div>
                  {/* big screen */}{" "}
                </button>

                <button
                  className="btn btn-error"
                  onClick={() => {
                    userLogout();
                    handlePollReset();
                  }}
                >
                  Logout
                </button>
              </div>
            </>
            {/* small screen */}
            <div className="block md:hidden">
              <div className="dropdown dropdown-bottom dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
                >
                  <li className="px-1 m-1">
                    <NavLink to="/presenterResult">Polls</NavLink>
                  </li>
                  <li className="px-1 m-1">
                    <NavLink to="/presenterCreate">Create</NavLink>
                  </li>
                  <div className="divider"></div>
                  <li className="px-1 m-1">
                    <button
                      className="bg-error"
                      onClick={() => {
                        userLogout();
                        handlePollReset();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
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
