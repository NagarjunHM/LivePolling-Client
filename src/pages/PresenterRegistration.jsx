import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import validateInput from "../utils/registrationInputValidation";
import useUserSlice from "../store/user/useUserSlice";

const PresenterRegistration = () => {
  const { registerNewUser, userError, resetUserSlice } = useUserSlice(
    (state) => ({
      registerNewUser: state.registerNewUser,
      userError: state.userError,
      resetUserSlice: state.resetUserSlice,
    })
  );

  // function to reset all userError loading state in userSlice. so that the error from registration page does not appear on login page and vise versa
  useEffect(() => {
    resetUserSlice();
  }, []);

  const navigate = useNavigate();
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });

  const [error, setError] = useState({});

  // handle input
  const handleInput = (e) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // handle form submite
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInput(value);
    setError(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const response = await registerNewUser(value);

    if (response) {
      navigate("/presenterLogin");
    }
  };

  return (
    <div>
      {/* registration form */}
      <div className="absolute top-0 left-0 min-h-screen hero bg-base-200">
        <div className="flex-col mt-20 lg:mt-20 hero-content lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Presenter Registration</h1>
            <p className="py-6">
              Register to manage your live presentations and engage with your
              audience in real-time.
            </p>
          </div>
          &nbsp;
          <div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="String"
                    placeholder="name"
                    className="input input-bordered"
                    value={value.name}
                    name="name"
                    onChange={handleInput}
                    autoFocus
                  />
                  {error.name && (
                    <span className="italic font-light text-red-500">
                      * {error.name}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    // type="email"
                    placeholder="email"
                    className="input input-bordered"
                    value={value.email}
                    name="email"
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
                    name="password"
                    placeholder="password"
                    onChange={handleInput}
                    value={value.password}
                    className="input input-bordered"
                  />
                  {error.password && (
                    <span className="italic font-light text-red-500">
                      * {error.password}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Re-password</span>
                  </label>
                  <input
                    type="password"
                    name="repassword"
                    onChange={handleInput}
                    value={value.repassword}
                    placeholder="enter password again"
                    className="input input-bordered"
                  />
                  {error.repassword && (
                    <span className="italic font-light text-red-500">
                      * {error.repassword}
                    </span>
                  )}

                  <div className="flex flex-row justify-between mt-2">
                    <Link
                      to="/presenterLogin"
                      className="text-sm link link-primary link-hover"
                    >
                      Already have an account ?
                    </Link>
                  </div>
                </div>
                <div className="mt-6 form-control">
                  <button type="submit" className="btn btn-warning">
                    Register
                  </button>
                </div>
              </form>
              {userError ? (
                <div className="italic font-light text-red-500">
                  * {userError}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresenterRegistration;
