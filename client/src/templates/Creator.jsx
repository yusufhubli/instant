import React from 'react'
import Button from './Button'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Creator = ({ follow, data }) => {
  const mode = useSelector(state => state.item.mode)
  const { _id, FirstName, LastName, UserName,Avatar } = data
  return (
    <div className={` ${mode == "light" ? "border-gray-800" : " border-gray-200"} flex items-center justify-between pl-3 pr-1 py-3 rounded-xl border-[1.5px] my-1.5`}>
      <Link className='flex items-center cursor-default' to={`/profile/${_id}`}>
        <img src={Avatar} className=' w-10 h-10 rounded-full border' alt="" />
        <div className='ml-2 font-poppins'>
          <h2 className=' text-[12px] font-bold capitalize'>{FirstName} {LastName}</h2>
          <h4 className='-mt-0.5 text-[11px] text-blue-700'>@{UserName}</h4>
        </div>
      </Link>
      <Button value={follow} widt={"5"} />
    </div>
  )
}

export default Creator
