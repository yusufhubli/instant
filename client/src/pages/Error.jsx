import React from 'react'
import { useSelector } from 'react-redux'

const Error = () => {
    const mode = useSelector(state =>state.item.mode)
  return (
    <div className={`${mode == "light" ? " bg-dark text-white" : "bg-light text-black"}`}>
      Something went wrong try later
    </div>
  )
}

export default Error
