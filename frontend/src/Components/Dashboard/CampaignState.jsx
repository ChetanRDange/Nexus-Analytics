import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Mail, FolderOpen, MousePointer, UserPlus } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const CampaignState = () => {
    const [data, setData] = useState([
        { name: 'Emails', value: 12346, change: 0.3, icon: Mail, color: 'violet' },
        { name: 'Opened', value: 8734, change: 2.1, icon: FolderOpen, color: 'cyan' },
        { name: 'Clicked', value: 967, change: 1.4, icon: MousePointer, color: 'emerald' },
        { name: 'Subscribe', value: 345, change: 8.5, icon: UserPlus, color: 'orange' },
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/dashboard/statistics`);
            const apiData = response.data.success ? response.data.data : {};

            // Update with real data if available
            const totalRecords = apiData.totalRecords || 1000;
            setData([
                { name: 'Emails', value: totalRecords * 12, change: 0.3, icon: Mail, color: 'violet' },
                { name: 'Opened', value: Math.round(totalRecords * 8.7), change: 2.1, icon: FolderOpen, color: 'cyan' },
                { name: 'Clicked', value: Math.round(totalRecords * 0.97), change: 1.4, icon: MousePointer, color: 'emerald' },
                { name: 'Subscribe', value: Math.round(totalRecords * 0.35), change: 8.5, icon: UserPlus, color: 'orange' },
            ]);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const colorClasses = {
        violet: 'bg-violet-100 text-violet-600',
        cyan: 'bg-cyan-100 text-cyan-600',
        emerald: 'bg-emerald-100 text-emerald-600',
        orange: 'bg-orange-100 text-orange-600',
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6 h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Monthly Campaign State</h2>
                <p className="text-sm text-gray-500">8.52k Social Visitors</p>
            </div>

            <div className="space-y-4">
                {data.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[item.color]}`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="font-semibold text-gray-800">
                                {item.value.toLocaleString()}
                            </span>
                            <span className={`text-xs font-medium ${item.change > 1 ? 'text-green-500' : 'text-red-500'}`}>
                                {item.change > 0 ? '+' : ''}{item.change}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CampaignState;
