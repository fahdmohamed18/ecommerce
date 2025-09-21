import Image from 'next/image'
import React from 'react'
import errorImage from './../../public/screens/404.jpg'

const Errorpage = () => {
  return (
    <div className='w-full md:w-[80%] mx-auto px-5 my-5 md:px-0'>
     <Image 
       src={errorImage}
       alt='404 Error'
       className='w-full'
     />
    </div>
)}

export default Errorpage