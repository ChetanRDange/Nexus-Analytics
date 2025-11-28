import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Moon, Sun, Settings, Monitor, ChevronDown } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const VuexyNavbar = () => {
    const { theme, setTheme, isDark } = useTheme();
    const [showThemeDropdown, setShowThemeDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowThemeDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const themeOptions = [
        { id: 'light', label: 'Light', icon: Sun },
        { id: 'dark', label: 'Dark', icon: Moon },
        { id: 'system', label: 'System', icon: Monitor },
    ];

    const getCurrentIcon = () => {
        if (theme === 'light') return Sun;
        if (theme === 'dark') return Moon;
        return Monitor;
    };

    const CurrentIcon = getCurrentIcon();

    return (
        <header className={`sticky top-0 z-30 flex h-[64px] items-center justify-between border-b px-6 transition-colors
            ${isDark ? 'bg-[#25293C] border-[#3B3F5C]' : 'bg-white border-gray-200'}`}>
            {/* Search Bar */}
            <div className="flex items-center flex-1 max-w-xl">
                <div className="relative w-full">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#6B6D8C]' : 'text-gray-400'}`} />
                    <input
                        type="text"
                        placeholder="Search ⌘K"
                        className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm transition-colors focus:outline-none
                            ${isDark
                                ? 'bg-[#2F3349] border-[#3B3F5C] text-white placeholder-[#6B6D8C] focus:border-[#7367F0]'
                                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-500'
                            } border`}
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
                {/* Language */}
                <button className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-[#3B3F5C] text-[#A3A4CC] hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}>
                    <span className="text-lg">🇺🇸</span>
                </button>

                {/* Theme Toggle Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                        className={`flex items-center gap-1 p-2 rounded-lg transition-colors
                            ${isDark ? 'hover:bg-[#3B3F5C] text-[#A3A4CC] hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}
                    >
                        <CurrentIcon className="w-5 h-5" />
                        <ChevronDown className="w-3 h-3" />
                    </button>

                    {showThemeDropdown && (
                        <div className={`absolute right-0 top-full mt-2 w-40 rounded-lg shadow-lg border overflow-hidden z-50
                            ${isDark ? 'bg-[#2F3349] border-[#3B3F5C]' : 'bg-white border-gray-200'}`}>
                            {themeOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => {
                                        setTheme(option.id);
                                        setShowThemeDropdown(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors
                                        ${theme === option.id
                                            ? 'bg-[#7367F0] text-white'
                                            : isDark
                                                ? 'text-[#A3A4CC] hover:bg-[#3B3F5C] hover:text-white'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                >
                                    <option.icon className="w-4 h-4" />
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Shortcuts */}
                <button className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-[#3B3F5C] text-[#A3A4CC] hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}>
                    <Settings className="w-5 h-5" />
                </button>

                {/* Notifications */}
                <button className={`relative p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-[#3B3F5C] text-[#A3A4CC] hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}>
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#EA5455] rounded-full" />
                </button>

                {/* User Profile */}
                <div className={`flex items-center gap-3 ml-2 pl-3 border-l ${isDark ? 'border-[#3B3F5C]' : 'border-gray-200'}`}>
                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#7367F0]">
                        <img
                            src="https://ui-avatars.com/api/?name=John+Doe&background=7367F0&color=fff"
                            alt="User"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default VuexyNavbar;
