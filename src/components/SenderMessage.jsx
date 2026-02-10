import React from 'react'
import dp from "../assets/dp.png"

const SenderMessage = () => {
  return (
    <div className='w-fit max-w-[500px] bg-cyan-600 px-[20px] py-[10px]
    text-white text-[19px] rounded-2xl rounded-tr-none relative right-0
    shadow-gray-400 shadow-lg flex flex-col gap-[10px] 
     ml-auto'>
      <img src={dp} alt="" className='w-[150px] rounded-lg' />
      <span>Hello</span>
    </div>
  )
}

export default SenderMessage