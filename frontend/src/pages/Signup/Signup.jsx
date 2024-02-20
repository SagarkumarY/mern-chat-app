import React, { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import userSignup from "../../hooks/userSignup";

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmpassword: "",
    gender: "",
  });

  const { loading, signup } = userSignup();

  const handleCheckboxOnChange = (gender) => {
    setInput({ ...input, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(input);
   
  };

  return (
    <div className="flex flex-col  items-center  justify-center min-w-96  mx-auto ">
      <div className="w-full p-6 shadow-md rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className=" text-3xl font-semibold text-center text-gray-300 ">
          Sign Up
          <span className="text-blue-500"> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter name..."
              className="w-full input input-bordered h-10"
              value={input.fullname}
              onChange={(e) => setInput({ ...input, fullname: e.target.value })}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Pasword</span>
            </label>
            <input
              type="password"
              placeholder="Enter confirm password"
              className="w-full input input-bordered h-10"
              value={input.confirmpassword}
              onChange={(e) =>
                setInput({ ...input, confirmpassword: e.target.value })
              }
            />
          </div>

          {/* General Checkbox goes here */}
          <GenderCheckbox
            onCheckboxChange={handleCheckboxOnChange}
            selectedgender={input.gender}
          />
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Already"} have a account ?
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2"
             disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : 'Signup'}
            
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
