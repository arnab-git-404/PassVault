import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function UserSignUp() {
  return (
    <div className=" flex items-center min-h-screen w-full justify-center">
      <div className="w-full max-w-md  mx-2 lg:mx-4">
        <div className="bg-white shadow-lg rounded-lg pb-5 pt-2 mt-5">
          <div className="px-5 pt-4">
            <form>
              <div className="text-3xl sm:text-4xl mb-5 font-medium text-gray-800 text-center">
                Sign Up
              </div>

              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="name"
                  name="name"
                  placeholder="Enter Your Name"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="password"
                  name="password"
                  placeholder="Enter Your Password"
                />
              </div>

              <div className="mb-3 flex justify-between ">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enter Otp
                  </label>

                  <input
                    type="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    id="password"
                    name="password"
                    placeholder="Check Your Email For Otp"
                  />
                </div>

                <button className="mt-5 block  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  Send Code
                </button>
              </div>

              <div className="text-right py-2">
                <p className="text-sm">
                Forgot password?
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="loginButton"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
              <div className="flex flex-col items-center">
                <p className="my-1">
                  <span className="text-gray-600">or</span>
                </p>
                GoogleSignIN
              </div>
            </form>
            <div>
              <p className="text-center text-sm">
              Already have an account? &nbsp; &nbsp;|&nbsp; &nbsp;
                <Link
                to={"/signin"}
                  className="font-bold text-indigo-600 hover:text-indigo-500"
                >
                  Sign In
                </Link>
              </p>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSignUp;
