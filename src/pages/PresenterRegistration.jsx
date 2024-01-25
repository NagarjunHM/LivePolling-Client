import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import validateInput from "../utils/registrationInputValidation";

const PresenterRegistration = () => {
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
  const handleSubmite = async (e) => {
    e.preventDefault();
    setError(validateInput(value));
    console.log(error);
    // checking if the error exists
    if (Object.keys(error).length === 0) {
      try {
        const newUser = await axios.post(
          "http://localhost:3000/api/user/register",
          { name: value.name, email: value.email, password: value.password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(newUser);
        if (newUser) {
          navigate("/presenterLogin");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="absolute top-0 min-h-screen hero ">
      <div className="flex-col hero-content lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Presenter Registration</h1>
          <p className="py-6">
            Register to manage your live presentations and engage with your
            audience in real-time.
          </p>
        </div>
        &nbsp;
        <div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
          <form className="card-body" onSubmit={handleSubmite}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="String"
                placeholder="name"
                className="input input-bordered"
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
        </div>
      </div>
    </div>
  );
};

export default PresenterRegistration;
