import React from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineInstagram } from 'react-icons/ai'

const Footer = () => {
  const mode = useSelector(state => state.item.mode)
  return (
    <>    
    <div className={`${mode == "light" ? "bg-dark" : "bg-light"} sm:hidden lg:flex items-center justify-between px-10 font-poppins w-full h-32`}>
        <div className='flex'>
          <AiOutlineInstagram size={30} />
          <h2 className={`font-medium font-poppins text-2xl`}>Instant</h2>
        </div>
        <p>copy&copy;rights 2024</p>
    </div>
    </>

  )
}

export default Footer
