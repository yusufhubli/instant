import React from 'react'
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai'
import { useSelector,useDispatch } from 'react-redux'
import { togModel } from '../redux/toggleSlice'
const Model = () => {
    const dispatch = useDispatch()
    const mode = useSelector(state => state.item.mode)
    return (
        <div>
            <div className={` pt-14 absolute z-20 flex bg-white justify-center w-full h-[551px]`}>
                <main className={`${mode == "light" ? " bg-dark text-white border-gray-700" : "bg-light text-black border-gray-300"} border h-[480px] w-[30%] text-center font-poppins px-10 py-6 mb-10 rounded-xl`}>
                    <div className=' flex items-center justify-between '>
                        <h1 className=' font-bold'>Edit Post</h1>
                        <AiOutlineClose onClick={()=>dispatch(togModel(false))} size={20} />
                    </div>
                    <img src="vite.svg" className=' w-[90%] h-60 mx-4 my-2 border-[1.5px] rounded-xl' alt="" />
                    <div className={`${mode == "light" ? " border-gray-200" : "border-gray-400"} flex items-center justify-center border-[1.5px] w-[90%] h-10 ml-4 rounded-xl `}>
                        <label htmlFor="file" className={`${mode == "light" ? " text-white" : "text-gray-400"} flex items-center cursor-pointer`}><AiOutlineFileImage size={20} /> <h3 className=' ml-2 text-xs'>Add Image</h3></label>
                        <input type="file" id='file' className=' hidden' />
                    </div>
                    <div className={` my-2`}>
                        <textarea rows={2} className={`${mode == "light" ? "bg-dark border-gray-200" : "bg-light border-gray-400"} px-3 py-1 w-[90%] rounded-xl placeholder:text-sm font-poppins outline-none border-[1.5px]`} placeholder='Description' />
                    </div>
                    <button className=' w-[90%] bg-white rounded-full text-black py-1.5 font-bold text-sm'>Edit</button> 
                </main>
            </div>
        </div>
    )
}

export default Model
