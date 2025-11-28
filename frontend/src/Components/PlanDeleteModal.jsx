import React, { useState } from 'react';
import Success from '../assets/svgs/success.svg'
import { Link } from 'react-router-dom';

const PlanDeleteModal = ({ isDeleteModalOpen, setIsDeleteModalOpen }) => {

    if (!isDeleteModalOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-40 overflow-y-auto">
                <div className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity" onClick={() => setIsDeleteModalOpen(false)}></div>
                <div className="flex items-start justify-center w-full min-h-screen px-4 text-center lg:absolute lg:top-[12%]">
                    <div className="bg-[#FFFFFF] rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[98%] sm:w-[90%] md:w-[680px] px-6 2xl:px-8 py-8">
                        <div className='w-full flex justify-between items-center gap-2 flex-wrap pb-3 border-b border-primary'>
                            <h2 className='text-dark text-xl font-bold'>Confirm Plan Archive</h2>
                            <div className='w-full md:w-fit flex justify-end items-center'>
                                <span onClick={() => setIsDeleteModalOpen(false)} className='p-1.5 rounded-xl hover:bg-gray-50'>
                                    <svg
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M18 6L6 18M6 6L18 18"
                                            stroke="#667085"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>

                                </span>
                            </div>
                        </div>

                        <div className='w-full mt-5'>
                            <h4 className='text-lg'>Plan Details</h4>
                            <p className='flex items-center flex-wrap md:flex-nowrap gap-y-1 md:text-lg'>
                                <span className='font-normal whitespace-nowrap'>Plan Name Silver</span> <span className='text-secondary px-3'>|</span> <span className='font-normal whitespace-nowrap'>Active Companies 500</span> <span className='text-secondary px-3'>|</span> <span className='font-normal flex items-center gap-2  whitespace-nowrap'>Plan Status <button className='flex items-center gap-2 rounded-xl px-2 py-1 bg-[#ECFDF3] text-[#027948]' id="button-84"><span className='w-[12px] h-[12px] bg-[#12B76A] rounded-full'></span>Active </button></span>
                            </p>
                            <p className='w-full tracking-wide mt-4 font-normal'>
                                This plan will be archived and will no longer be available for new subscriptions or purchases. Existing users will continue to have access until their subscriptions expire. You can restore the plan at any time.
                            </p>
                            <p className='w-full tracking-wide mt-4 font-normal'>
                                This plan has pending invoices for 10 users. Archiving the plan will not cancel these invoices. Users will continue to be billed until their subscription period ends or the invoice is settled.
                            </p>

                            <button className='text-[#175CD3] font-semibold text-lg mt-4' id="button-85">
                                Learn More
                            </button>
                        </div>

                        <div className='w-full flex gap-4 justify-end items-center pt-3'>
                            <button onClick={() => setIsDeleteModalOpen(false)} className='w-fit text-center rounded-xl border border-primary hover:bg-gray-50 py-2 px-4' id="button-86">
                                Cancel
                            </button>
                            <button onClick={() => setIsDeleteModalOpen(false)} className='w-fit text-center rounded-xl bg-danger hover:bg-[#B42318] text-white py-2 px-4' id="button-87">
                                Archive Plan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlanDeleteModal;
