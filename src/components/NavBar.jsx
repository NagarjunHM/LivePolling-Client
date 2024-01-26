import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import useUserSlice from "../store/user/useUserSlice";

const NavBar = () => {
  const location = useLocation();
  const { user, userLogout } = useUserSlice((state) => ({
    user: state.user,
    userLogout: state.userLogout,
  }));

  return (
    <>
      <div className="shadow navbar bg-base-300">
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
        {location.pathname === "/presenterCreate" ||
        location.pathname === "/presenterResult" ? (
          <>
            <div className="flex-grow">
              <ul className="px-1 menu menu-horizontal">
                <li className="px-1">
                  <NavLink to="/presenterCreate">Create</NavLink>
                </li>
                <li className="px-1">
                  <NavLink to="/presenterResult">Result</NavLink>
                </li>
              </ul>
            </div>
            <div className="gap-4 flex-0">
              <button className="btn-ghost">{user.email}</button>
              <button
                className="btn btn-outline btn-error"
                onClick={userLogout}
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
