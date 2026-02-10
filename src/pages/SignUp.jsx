import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState(false);
  let dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          userName,
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(setUserData(result.data));
      navigate("/profile")
      setEmail("");
      setPassword("");
      setUserName("");
      setLoading(false);
      setErr("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErr(error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-slate-200 flex items-center justify-center">
      <div
        className="w-full max-w-[500px] h-[600px] bg-white 
      rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]"
      >
        {/* Header */}
        <div
          className="w-full h-[200px] bg-[#20c7ff]
         rounded-b-[30%] shadow-gray-200 shadow-lg flex items-center justify-center"
        >
          <h1 className="text-3xl font-extrabold text-gray-500">HeyChat</h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSignup}
          className="w-full flex flex-col gap-[20px] items-center"
        >
          <input
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            type="text"
            placeholder="Enter username"
            className="w-[90%] h-[50px] outline-none border-2 border-cyan-400 
            px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200"
          />

          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter email"
            className="w-[90%] h-[50px] outline-none border-2 border-cyan-400 
            px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200"
          />

          {/* Password */}
          <div
            className="w-[90%] h-[50px] border-2 border-cyan-400 
          overflow-hidden rounded-lg shadow-gray-200 relative"
          >
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={show ? "text" : "password"}
              placeholder="Enter password"
              className="w-full h-full outline-none px-[20px] py-[10px]"
            />

            <span
              onClick={() => setShow((prev) => !prev)}
              className="absolute top-[10px] right-[20px]
              text-[19px] text-cyan-400 cursor-pointer font-semibold"
            >
              {show ? "Hide" : "Show"}
            </span>
          </div>

          {err && <p className="text-red-600">{"*" + err}</p>}

          <button
            type="submit"
            className="p-[20px] py-[10px] bg-[#20c7ff]
            rounded-2xl shadow-gray-400 shadow-lg cursor-pointer
            text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner"
            disabled={loading}
          >
            {loading ? "Loading...." : "SignUp"}
          </button>

          <p onClick={() => navigate("/login")} className="cursor-pointer">
            Already Have An Account?{" "}
            <span className="font-bold text-blue-500">Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
