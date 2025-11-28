import React from 'react'
import NoPlansImg from '../assets/svgs/no-plans.svg'
import Add from '../assets/svgs/add.svg'

const NoPlans = () => {
    return (
        <div className='w-full h-full flex justify-center items-center bg-white'>
            <div className='py-2 flex flex-col justify-center items-center sm:w-[473px]'>
                <img src={NoPlansImg} alt='UnableToLoad' />
                <h2 className='text-black font-semibold text-center text-xl pt-4'>
                    No Plans Yet, but That's Easy to Fix!
                </h2>
                <p className='text-center text-primary pt-1'>
                    It looks like you haven’t added any plans yet. Start by creating one to track your goals and milestones efficiently.
                </p>

                <button className='px-4 py-2 text-white bg-primary hover:bg-[#2E90FA] rounded-xl mt-4 flex gap-2 items-center' id="button-82">
                    <img src={Add} alt='Add'/>
                    <span> Add Your First Plan </span>
                </button>
            </div>
        </div>

    )
}

export default NoPlans