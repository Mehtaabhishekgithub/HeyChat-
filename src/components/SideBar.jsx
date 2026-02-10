import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.png";
import { MdPersonSearch } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import { serverUrl } from "../main";
import { setOtherUsers, setSelectedUser, setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function SideBar() {
  let { userData, otherUsers } = useSelector((state) => state.user);
  let [search, setSearch] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();
    let {selectedUser}= useSelector(state=>state.user)
  

  const handleLogout = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      navigate("login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`lg:w-[30%] w-full h-full lg:block bg-slate-200 ${!selectedUser?"block":"hidden"}`}>
      <div
        onClick={handleLogout}
        className="w-[60px] h-[60px] overflow-hidden
       rounded-full   shadow-sm bg-cyan-400
            shadow-[#20c7ff] shadow-lg flex justify-center items-center fixed bottom-[20px] left-[10px]"
      >
        <BiLogOutCircle className="w-[25px] h-[25px] cursor-pointer" />
      </div>

      <div
        className="w-full h-[300px] bg-[#20c7ff]
         rounded-b-[30%] shadow-gray-400  shadow-lg flex flex-col justify-center px-[20px]"
      >
        <h1 className="text-white font-bold text-[25px]">HeyChat</h1>

        <div className="w-full flex justify-between items-center ">
          <h1 className="text-gray-800 font-bold text-[25px]">
            Hii, {userData?.name || "user"}
          </h1>
          <div
            onClick={() => {
              navigate("/profile");
            }}
            className="w-[60px] h-[60px] overflow-hidden
              rounded-full   shadow-lg bg-white
            shadow-gray-500 flex justify-center cursor-pointer items-center"
          >
            <img src={userData?.image || dp} alt="" className="h-[100%]" />
          </div>
        </div>

        <div className="w-full flex items-center mt-[10px] gap-[20px]">
          {!search && (
            <div
              onClick={() => {
                setSearch(true);
              }}
              className="w-[60px] h-[60px] overflow-hidden
              rounded-full   shadow-lg bg-white
            shadow-[#20c7ff] shadow-lg flex justify-center items-center"
            >
              <MdPersonSearch className="w-[25px] h-[25px] cursor-pointer" />
            </div>
          )}

          {search && (
            <form
              className="w-full h-[60px] bg-white mt-[10px]
           shadow-gray-500 shadow-lg flex items-center gap-[10px]
            mt-[10px] rounded-full overflow-hidden px-[20px]"
            >
              <MdPersonSearch className="w-[25px] h-[25px] " />
              <input
                type="text"
                placeholder="Search users"
                className="w-full text-[15px] h-full p-[10px] outline-0 border-0"
              />
              <RxCross2
                onClick={() => {
                  setSearch(false);
                }}
                className="w-[25px] h-[25px] cursor-pointer"
              />
            </form>
          )}
          {!search &&
            otherUsers?.map((user) => (
              <div
                className="w-[60px] h-[60px] overflow-hidden rounded-full 
            shadow-gray-500 shadow-lg bg-white flex justify-center items-center "
              >
                <img src={user.image || dp} alt="" className="h-[100%]" />
              </div>
            ))}
        </div>
      </div>

      <div
       className="w-full h-[60vh] overflow-auto
       flex flex-col gap-[20px] items-center mt-[20px] ">
        {otherUsers?.map((user) => (
          <div
          onClick={()=>{dispatch(setSelectedUser(user))}}
            className="w-[95%] h-[60px] flex  items-center gap-[20px] 
             shadow-gray-500 bg-white
            shadow-lg rounded-full
            hover:bg-cyan-300 cursor-pointer"
          >
            <div
              className="w-[60px] h-[60px]  overflow-hidden rounded-full 
            shadow-gray-500 shadow-lg bg-white flex justify-center items-center  "
            >
              <img src={user.image || dp} alt="" className="h-[100%]" />
            </div>
            <h1 className="text-gray-800 font-bold text-[15px]">
              {user.name || user.userName}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
