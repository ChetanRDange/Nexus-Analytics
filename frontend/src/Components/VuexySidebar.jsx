import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    BarChart3,
    PieChart,
    TrendingUp,
    Globe,
    Database,
    FileText,
    Users,
    Settings,
    ChevronDown,
    ChevronRight,
    Layers,
    Activity,
    Target,
    Zap,
    Map,
    BookOpen,
    Filter,
    Calendar,
    Building2,
    Menu,
    Sparkles,
    LineChart,
    GitBranch,
} from 'lucide-react';
import { useTheme } from '../ThemeContext';

const VuexySidebar = ({ isCollapsed, setIsCollapsed }) => {
    const location = useLocation();
    const [openMenus, setOpenMenus] = useState(['analytics']);
    const { isDark } = useTheme();

    const toggleMenu = (menuId) => {
        setOpenMenus(prev =>
            prev.includes(menuId)
                ? prev.filter(id => id !== menuId)
                : [...prev, menuId]
        );
    };

    const isActive = (path) => location.pathname === path;
    const isMenuOpen = (menuId) => openMenus.includes(menuId);

    const menuItems = [
        {
            id: 'dashboards',
            label: 'Dashboards',
            icon: LayoutDashboard,
            badge: '7',
            children: [
                { label: 'Overview', path: '/dashboard/overview', icon: Activity },
                { label: 'Sectors', path: '/dashboard/sectors', icon: Layers },
                { label: 'Regions', path: '/dashboard/regions', icon: Globe },
                { label: 'Timeline', path: '/dashboard/timeline', icon: Calendar },
                { label: 'PESTLE', path: '/dashboard/pestle', icon: Zap },
                { label: 'Advanced Charts', path: '/dashboard/advanced', icon: Sparkles },
                { label: 'Analytics', path: '/dashboard/analytics', icon: LineChart },
            ]
        },
        {
            id: 'analytics',
            label: 'Data Analytics',
            icon: BarChart3,
            children: [
                { label: 'Overview', path: '/analytics', icon: PieChart },
                { label: 'By Region', path: '/data/region', icon: Globe },
                { label: 'By Sector', path: '/data/sector', icon: Layers },
                { label: 'By Topic', path: '/data/topic', icon: Target },
                { label: 'By Source', path: '/data/source', icon: Database },
                { label: 'Timeline', path: '/data/timeline', icon: Calendar },
                { label: 'PESTLE Analysis', path: '/data/pestle', icon: Zap },
            ]
        },
        {
            id: 'charts',
            label: 'Charts Library',
            icon: PieChart,
            badge: '70+',
            children: [
                { label: 'Advanced Nivo', path: '/charts/advanced', icon: Sparkles },
                { label: 'All Chart Types', path: '/charts/nivo', icon: BarChart3 },
            ]
        },
        {
            id: 'insights',
            label: 'Insights',
            icon: TrendingUp,
            children: [
                { label: 'Trends', path: '/insights/trends', icon: TrendingUp },
                { label: 'Predictions', path: '/insights/predictions', icon: Target },
                { label: 'Reports', path: '/insights/reports', icon: FileText },
            ]
        },
        {
            id: 'data',
            label: 'Data Explorer',
            icon: Database,
            children: [
                { label: 'All Records', path: '/data/all', icon: Database },
                { label: 'Advanced Filter', path: '/data/filter', icon: Filter },
                { label: 'Export Data', path: '/data/export', icon: FileText },
            ]
        },
        {
            id: 'geography',
            label: 'Geography',
            icon: Map,
            children: [
                { label: 'World Map', path: '/geo/map', icon: Map },
                { label: 'By Country', path: '/geo/country', icon: Globe },
                { label: 'By Region', path: '/geo/region', icon: Globe },
            ]
        },
    ];

    // Only show working routes in bottom menu
    const bottomMenuItems = [];

    return (
        <aside className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 ${isCollapsed ? 'w-[80px]' : 'w-[260px]'}
            ${isDark ? 'bg-[#2F3349]' : 'bg-white border-r border-gray-200'}`}>
            {/* Logo Section */}
            <div className={`flex h-[64px] items-center justify-between px-5 border-b ${isDark ? 'border-[#3B3F5C]' : 'border-gray-200'}`}>
                {!isCollapsed && (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7367F0] to-[#9E95F5] flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Blackcoffer</span>
                    </div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-[#3B3F5C] text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'}`}
                >
                    <Menu className="w-5 h-5" />
                </button>
            </div>

            {/* Navigation */}
            <nav className={`flex flex-col h-[calc(100vh-64px)] overflow-y-auto no-scrollbar`} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className="flex-1 px-3 py-4">
                    {/* Main Menu Items */}
                    {menuItems.map((item) => (
                        <div key={item.id} className="mb-1">
                            <button
                                onClick={() => toggleMenu(item.id)}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all
                                    ${isDark
                                        ? `text-[#A3A4CC] hover:text-white hover:bg-[#3B3F5C] ${isMenuOpen(item.id) ? 'text-white bg-[#3B3F5C]' : ''}`
                                        : `text-gray-600 hover:text-gray-900 hover:bg-gray-100 ${isMenuOpen(item.id) ? 'text-gray-900 bg-gray-100' : ''}`
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className="w-5 h-5" />
                                    {!isCollapsed && (
                                        <span className="text-sm font-medium">{item.label}</span>
                                    )}
                                </div>
                                {!isCollapsed && (
                                    <div className="flex items-center gap-2">
                                        {item.badge && (
                                            <span className="px-2 py-0.5 text-xs font-medium bg-[#7367F0] text-white rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                        {isMenuOpen(item.id) ? (
                                            <ChevronDown className="w-4 h-4" />
                                        ) : (
                                            <ChevronRight className="w-4 h-4" />
                                        )}
                                    </div>
                                )}
                            </button>

                            {/* Submenu */}
                            {!isCollapsed && isMenuOpen(item.id) && item.children && (
                                <div className={`mt-1 ml-4 pl-4 border-l ${isDark ? 'border-[#3B3F5C]' : 'border-gray-200'}`}>
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.path}
                                            to={child.path}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${isActive(child.path)
                                                ? 'text-[#7367F0] bg-[#7367F0]/10'
                                                : isDark
                                                    ? 'text-[#A3A4CC] hover:text-white hover:bg-[#3B3F5C]'
                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                                }`}
                                        >
                                            <child.icon className="w-4 h-4" />
                                            <span>{child.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Only show divider and bottom items if there are any */}
                    {bottomMenuItems.length > 0 && (
                        <>
                            {/* Divider */}
                            <div className={`my-4 border-t ${isDark ? 'border-[#3B3F5C]' : 'border-gray-200'}`} />

                            {/* Apps & Pages Label */}
                            {!isCollapsed && (
                                <div className="px-3 mb-3">
                                    <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-[#6B6D8C]' : 'text-gray-400'}`}>
                                        Apps & Pages
                                    </span>
                                </div>
                            )}

                            {/* Bottom Menu Items */}
                            {bottomMenuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${isActive(item.path)
                                        ? 'text-[#7367F0] bg-[#7367F0]/10'
                                        : isDark
                                            ? 'text-[#A3A4CC] hover:text-white hover:bg-[#3B3F5C]'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {!isCollapsed && <span className="font-medium">{item.label}</span>}
                                </Link>
                            ))}
                        </>
                    )}
                </div>

                {/* User Profile Section */}
                {!isCollapsed && (
                    <div className={`p-4 border-t ${isDark ? 'border-[#3B3F5C]' : 'border-gray-200'}`}>
                        <div className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? 'bg-[#3B3F5C]/50' : 'bg-gray-100'}`}>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7367F0] to-[#9E95F5] flex items-center justify-center">
                                <span className="text-white font-semibold">JD</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>John Doe</p>
                                <p className={`text-xs truncate ${isDark ? 'text-[#A3A4CC]' : 'text-gray-500'}`}>Admin</p>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </aside>
    );
};

export default VuexySidebar;
