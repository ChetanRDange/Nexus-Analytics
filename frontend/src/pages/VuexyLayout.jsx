import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import VuexySidebar from '../Components/VuexySidebar';
import VuexyNavbar from '../Components/VuexyNavbar';
import { useTheme } from '../ThemeContext';

const VuexyLayout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const { isDark } = useTheme();

    return (
        <div className={`min-h-screen h-screen overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
            {/* Sidebar */}
            <VuexySidebar
                isCollapsed={sidebarCollapsed}
                setIsCollapsed={setSidebarCollapsed}
            />

            {/* Main Content */}
            <div className={`h-screen flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-[80px]' : 'ml-[260px]'}`}>
                {/* Navbar */}
                <VuexyNavbar />

                {/* Page Content with hidden scrollbar */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default VuexyLayout;
