import React from 'react'
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import MobileNav from '../components/MobileNav'
import Navbar from '../components/Navbar'
import Creator from './Creator'
import { Link } from 'react-router-dom'

const Test = () => {
    const mode = useSelector(state => state.item.mode)
    return (
        <div className=' relative pt-16'>
            
              <div className=' min-h-screen bg-black py-36 px-44 flex justify-around font-poppins font-bold'>
                   <div className=' w-48 h-40 rounded-xl text-sm p-5 sha'>Hello, Everyone today we are going to learn CSS Shadow property which is used improve User Interface</div>
                   <div className=' w-48 h-40 rounded-xl text-sm p-5 sha'>Hello, Everyone today we are going to learn CSS Shadow property which is used improve User Interface</div>
                   <div className=' w-48 h-40 rounded-xl text-sm p-5 sha'>Hello, Everyone today we are going to learn CSS Shadow property which is used improve User Interface</div>
                   <div className=' w-48 h-40 rounded-xl text-sm p-5 sha'>Hello, Everyone today we are going to learn CSS Shadow property which is used improve User Interface</div>
              </div>

            {/*search results <div className={`${mode == "light" ? "bg-dark border-gray-700" : "bg-light border-gray-300"} absolute left-0 border rounded-xl p-4 bg-black w-2/5 h-[400px]`}>
                <h2 className=' text-[13px] font-bold -mt-1.5 mb-3'>Search Results...</h2>
                <div className=' h-[350px] overflow-hidden overflow-y-scroll hid'>
                    {/* <p className=' text-sm text-gray-400 text-center py-4'>no search result found</p> 
                    <div className=' border-[1.5px] border-gray-700 h-16 my-1.5 rounded-lg font-poppins flex items-center justify-between px-5'>
                        <div className='flex items-center cursor-default'>
                            <img src="vite.svg" className=' w-10 h-10 rounded-full border' alt="" />
                            <div className='ml-2 font-poppins'>
                                <h2 className=' text-[12px] font-bold capitalize'>FirstName LastName</h2>
                                <h4 className='-mt-0.5 text-[11px] text-blue-700'>@UserName</h4>
                            </div>
                        </div>
                        <h1 className=' text-xs font font-bold cursor-pointer'>View Profile</h1>
                    </div>
                    <div className=' hover:bg-gray-800 border-[1.5px] border-gray-700 h-16 my-1.5 rounded-lg font-poppins flex items-center justify-between px-5'>
                        <div className='flex items-center cursor-default'>
                            <img src="vite.svg" className=' w-10 h-10 rounded-full border' alt="" />
                            <div className='ml-2 font-poppins'>
                                <h2 className=' text-[12px] font-bold capitalize'>FirstName LastName</h2>
                                <h4 className='-mt-0.5 text-[11px] text-blue-700'>@UserName</h4>
                            </div>
                        </div>
                        <h1 className=' text-xs font font-bold cursor-pointer'>View Profile</h1>
                    </div>
                    <div className=' border-[1.5px] border-gray-700 h-16 my-1.5 rounded-lg font-poppins flex items-center justify-between px-5'>
                        <div className='flex items-center cursor-default'>
                            <img src="vite.svg" className=' w-10 h-10 rounded-full border' alt="" />
                            <div className='ml-2 font-poppins'>
                                <h2 className=' text-[12px] font-bold capitalize'>FirstName LastName</h2>
                                <h4 className='-mt-0.5 text-[11px] text-blue-700'>@UserName</h4>
                            </div>
                        </div>
                        <h1 className=' text-xs font font-bold cursor-pointer'>View Profile</h1>
                    </div>
                    <div className=' border-[1.5px] border-gray-700 h-16 my-1.5 rounded-lg font-poppins flex items-center justify-between px-5'>
                        <div className='flex items-center cursor-default'>
                            <img src="vite.svg" className=' w-10 h-10 rounded-full border' alt="" />
                            <div className='ml-2 font-poppins'>
                                <h2 className=' text-[12px] font-bold capitalize'>FirstName LastName</h2>
                                <h4 className='-mt-0.5 text-[11px] text-blue-700'>@UserName</h4>
                            </div>
                        </div>
                        <h1 className=' text-xs font font-bold cursor-pointer'>View Profile</h1>
                    </div>
                    <div className=' border-[1.5px] border-gray-700 h-16 my-1.5 rounded-lg font-poppins flex items-center justify-between px-5'>
                        <div className='flex items-center cursor-default'>
                            <img src="vite.svg" className=' w-10 h-10 rounded-full border' alt="" />
                            <div className='ml-2 font-poppins'>
                                <h2 className=' text-[12px] font-bold capitalize'>FirstName LastName</h2>
                                <h4 className='-mt-0.5 text-[11px] text-blue-700'>@UserName</h4>
                            </div>
                        </div>
                        <h1 className=' text-xs font font-bold cursor-pointer'>View Profile</h1>
                    </div>
                    <div className=' border-[1.5px] border-gray-700 h-16 my-1.5 rounded-lg font-poppins flex items-center justify-between px-5'>
                        <div className='flex items-center cursor-default'>
                            <img src="vite.svg" className=' w-10 h-10 rounded-full border' alt="" />
                            <div className='ml-2 font-poppins'>
                                <h2 className=' text-[12px] font-bold capitalize'>FirstName LastName</h2>
                                <h4 className='-mt-0.5 text-[11px] text-blue-700'>@UserName</h4>
                            </div>
                        </div>
                        <h1 className=' text-xs font font-bold cursor-pointer'>View Profile</h1>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Test
