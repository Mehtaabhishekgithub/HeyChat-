import React, { useRef, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import dp from "../assets/dp.png";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { BsEmojiWinkFill } from "react-icons/bs";
import { IoImagesOutline } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import axios from "axios";
import { serverUrl } from "../main";

function MessageArea() {
  let { selectedUser } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let [showPicker, setShowPicker] = useState(false);
  let [input, setInput] = useState("");
  let [frontendImage, setFrontendImage] = useState(null);
  let [backendImage, setBackendImage] = useState(null);
  const image = useRef(null)

   const handleImage = async (e)=>{
   let file = e.target.files[0]
   setBackendImage(file)
   setFrontendImage(URL.createObjectURL(file))
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    try {
      let formData = new FormData();
      formData.append("message", input);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      let result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`,formData,{withCredentials:true});
      console.log(result.data)
      setInput("")
      setFrontendImage(null)
      setBackendImage(null)
    } catch (error) {
      console.log(error)
    }
  };

  const onEmojiClick = (emojiData) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
    setShowPicker(false);
  };

 
  return (
    <div
      className={`lg:w-[70%]  ${selectedUser ? "flex" : "hidden"} lg:flex w-full h-full
       bg-slate-200 border-l-2 border-gray-300 relative`}
    >
      {selectedUser && (
        <div className="w-full h-[100vh] flex flex-col">
          <div
            className="w-full h-[100px] bg-cyan-500  gap-[20px] 
       rounded-b-[30px] shadow-gray-400  shadow-lg flex  items-center px-[20px]"
          >
            <div
              onClick={() => {
                dispatch(setSelectedUser(null));
              }}
              className="cursor-pointer"
            >
              <IoArrowBackOutline className=" text-[30px] text-white " />
            </div>

            <div
              className="w-[50px] h-[50px] overflow-hidden
            rounded-full   shadow-lg bg-white
           shadow-gray-500 flex justify-center cursor-pointer items-center"
            >
              <img
                src={selectedUser?.image || dp}
                alt=""
                className="h-[100%]"
              />
            </div>

            <h1 className="text-white font-bold text-[15px]">
              {selectedUser?.name || "User"}
            </h1>
          </div>

          <div className="w-full h-[550px] flex flex-col py-[30px] px-[20px] overflow-auto ">
            {showPicker && (
              <div className="absolute bottom-[120px] left-[20px]">
                <EmojiPicker
                  width={270}
                  height={350}
                  className="shadow-lg"
                  onEmojiClick={onEmojiClick}
                />{" "}
              </div>
            )}
          </div>
        </div>
      )}

      {!selectedUser && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-gray-700 font-bold text-[50px]">
            Welcome To HeyChat
          </h1>
          <span className="text-gray-700 font-bold text-[20px]">
            Chat With Your ❤️
          </span>
        </div>
      )}

      {selectedUser && (
        <div
          className="w-full lg:w-[70%] h-[100px] fixed bottom-[20px] flex 
       items-center justify-center"
        >
           <img src={frontendImage}  alt="" className="w-[80px] absolute bottom-[100px]  right-[20%] rounded-lg shadow-gray-400" />
          <form
            onSubmit={handleSendMessage}
            className=" w-[95%] lg:w-[70%] rounded-full
         bg-cyan-600 h-[60px] shadow-gray-700 flex items-center gap-[20px] px-[20px] "
          >
            <div onClick={() => setShowPicker((prev) => !prev)}>
              <BsEmojiWinkFill className="w-[25px] h-[25px] text-2xl text-amber-50 cursor-pointer" />
            </div>
            
            <input 
            onChange={handleImage}
            type="file"  accept="image/*" ref={image} hidden/>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Enter text here"
              className=" w-full h-[full] px-[10px] rounded-full
          outline-none border-0 text-[19px] text-white bg-transparent "
            />

            <div>
              <IoImagesOutline 
              onClick={()=>image.current.click()}
              className="w-[25px] h-[25px] text-2xl text-amber-50 cursor-pointer" />
            </div>

            <button>
              <IoSend className="w-[25px] h-[25px] text-2xl text-amber-50 cursor-pointer" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default MessageArea;
