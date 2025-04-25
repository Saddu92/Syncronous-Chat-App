import { animationDefaultOptions } from '@/lib/utils';
import React from 'react';
import Lottie from "react-lottie";

function EmptyChatContainer() {
  return (
    <div className='flex-1 bg-[#1c1d25] hidden lg:flex flex-col justify-center items-center duration-1000 transition-all'>
      <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOptions}
      />
      <h3 className='poppins-medium text-center mt-5'>
        Hi<span className='text-purple-500'>!</span> Welcome to
        <span className='text-purple-500'> Synchronous </span> Chat App
        <span className='text-purple-500'>.</span>
      </h3>
    </div>  
  );
}

export default EmptyChatContainer;
