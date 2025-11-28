import React from 'react';

const WelcomeCard = ({ userName = 'Admin', amount = '0', subtitle = 'Total Records' }) => {
    return (
        <div className="bg-gradient-to-r from-[#7367F0] to-[#9E95F5] rounded-xl p-5 h-full relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-white font-semibold text-lg mb-1">
                    Welcome {userName}! 🎉
                </h3>
                <p className="text-white/80 text-sm mb-4">
                    {subtitle}
                </p>
                <p className="text-3xl font-bold text-white mb-4">
                    {amount}
                </p>
                <button className="px-4 py-2 bg-white text-[#7367F0] font-medium rounded-lg hover:bg-white/90 transition-colors text-sm">
                    View Analytics
                </button>
            </div>

            {/* Decorative Avatar/Character */}
            <div className="absolute right-4 bottom-0 w-24 h-32">
                <div className="w-full h-full bg-white/10 rounded-t-full"></div>
            </div>

            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
    );
};

export default WelcomeCard;
