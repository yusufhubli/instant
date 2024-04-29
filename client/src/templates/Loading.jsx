import React from 'react'

const Loading = () => {
  return (
    <div className='relative flex items-center'>
    <span className=' absolute animate h-5 w-5 rounded-full bg-gradient-to-tr from-white via-white to-black animate-spin'>
        <span className=' absolute z-10 m-0.5 bg-black h-4 w-4 rounded-full'></span>
    </span><h1 className=' ml-7 text-xs font-poppins font-bold'>Loading...</h1>
</div>
  )
}

export default Loading
