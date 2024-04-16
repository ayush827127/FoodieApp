import React, { useState } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Modal = () => {
  const { register, handleSubmit } = useForm();

  const { signUpWithGmail, login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const axiosPublic = useAxiosPublic();

  // redirecting to home page or specifig page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((result) => {
        const userInfo = {
          name: data.name,
          email: data.email,
        };
        axiosPublic
          .post("users", userInfo)
          .then((response) => {
            alert("Login Successfully !");
            document.getElementById("my_modal_5").close();
            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        setErrorMessage("Provide a correct email and password!");
      });
  };

  const handleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic.post("users", userInfo).then((response) => {
          alert("Login Successfully !");
          document.getElementById("my_modal_5").close();
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        seterrorMessage("Please provide valid email & password!");
      });
  };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"
            method="dialog"
          >
            <h3 className="font-bold text-lg">Please Login!</h3>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* show errors */}
            {errorMessage ? (
              <p className="text-red text-xs italic">
                Provide a correct username & password.
              </p>
            ) : (
              ""
            )}

            {/* login btn */}
            <div className="form-control mt-3">
              <input
                type="submit"
                value="Login"
                className="btn bg-green text-white"
              />
            </div>

            <p className="text-center mt-2 mb-0 ">
              Don't have an account?{" "}
              <Link to="/signup" className="underline text-red ml-1">
                Signup Now
              </Link>
            </p>

            <button
              htmlFor="my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          {/* <hr className="my-3 " /> */}
          {/* social sign in */}
          <div className="text-center space-x-3 mb-5">
            <button
              className="btn btn-circle hover:bg-green hover:text-white"
              onClick={handleLogin}
            >
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
