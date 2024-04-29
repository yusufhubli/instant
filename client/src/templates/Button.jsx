import React from 'react'
import {useSelector,useDispatch} from 'react-redux'

const Button = ({value,onClick,widt}) => {

    const mode = useSelector(state=>state.item.mode)
  return (
     <button onClick={onClick} className={` mx-2 text-[12px] border-[1.4px] py-1 px-${widt} font-poppins text-center font-medium rounded-full ${mode == "light"?"border-white bg-dark text-white hover:bg-white hover:text-gray-900":"border-gray-700 bg-light text-black hover:bg-dark hover:text-gray-50"}`}>{value}</button>
  )
}

export default Button
