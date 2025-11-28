import React from 'react'
import UnableToLoadImg from '../assets/svgs/unable-to-load.svg'

const UnableToLoad = () => {
    return (
        <div className='w-full h-screen flex justify-center bg-white'>
            <div className='flex flex-col justify-center items-center sm:w-[473px]'>
                <img src={UnableToLoadImg} alt='UnableToLoad' />
                <h2 className='text-black font-semibold text-center text-xl pt-4'>
                    Unable to Load Data
                </h2>
                <p className='text-center text-primary pt-1'>
                    Something went wrong, but don't worry! We're already on it and will have things back to normal shortly.
                </p>

                <button className='px-4 py-2 text-white bg-primary hover:bg-[#2E90FA] rounded-xl mt-4' id="button-113">
                    Retry Loading
                </button>
            </div>
        </div>
    )
}

export default UnableToLoad