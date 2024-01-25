import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import validateInput from "../utils/loginInputValidation";
import useUserSlice from "../store/user/useUserSlice";
import LoaderComp from "../components/LoaderComp";

const PresenterLogin = () => {
  const { validateUser, loading } = useUserSlice((state) => {
    return {
      validateUser: state.validateUser,
      loading: state.userLoading,
    };
  });
  const navigate = useNavigate();

  const [value, setValue] = useState({ email: "", password: "" });
  const [error, setError] = useState({});

  // handle form input
  const handleInput = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(validateInput(value));

    // checking for error
    if (Object.keys(error).length === 0) {
      const result = await validateUser(value);

      if (result) {
        navigate("/presenterCreate", { replace: true });
      }
    }
  };

  if (loading) {
    return (
      <>
        <LoaderComp />
      </>
    );
  }
  return (
    <div className="absolute top-0 min-h-screen hero ">
      <div className="flex-col hero-content lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Presenter Login</h1>
          <p className="py-6">
            Login to manage your live presentations and engage with your
            audience in real-time.
          </p>
        </div>
        &nbsp;
        <div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="String"
                name="email"
                placeholder="email"
                className="input input-bordered"
                onChange={handleInput}
                autoFocus
              />
              {error.email && (
                <span className="italic font-light text-red-500">
                  * {error.email}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={handleInput}
                className="input input-bordered"
              />
              {error.password && (
                <span className="italic font-light text-red-500">
                  * {error.password}
                </span>
              )}
              <div className="flex flex-row justify-between mt-2">
                <Link to="" className="text-sm link link-hover">
                  Forgot password?
                </Link>

                <Link
                  to="/presenterRegistration"
                  className="text-sm link link-primary link-hover"
                >
                  Create new account!!
                </Link>
              </div>
            </div>
            <div className="mt-6 form-control">
              <button className="btn-warning btn" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PresenterLogin;
