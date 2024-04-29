import React, { useState } from 'react'
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { togPopup } from '../redux/toggleSlice'

const PopUp = ({text,val}) => {
  const dispatch = useDispatch()
    const mode = useSelector(state=>state.item.mode)
    const popup = useSelector(state=>state.anime.popup)
  return (
    <div>
      <div className={`${popup ? "block" :"hidden"} w-full pt-14 absolute flex justify-center`}>
        <main className={`${mode == "light"?" bg-dark text-white border-gray-700":"bg-light text-black border-gray-300"} border  fixed z-40 w-[25%] py-4 text-center font-poppins rounded-xl`}>
            <h1 className=' text-[14px] font-medium mb-4'>{text}</h1>
            <Button value={val} widt={"6"} />
            <Button value={'Cancel'} onClick={()=>dispatch(togPopup(false))} widt={"6"} />
        </main>
      </div>
    </div>
  )
}

export default PopUp
