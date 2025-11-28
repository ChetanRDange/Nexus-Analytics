import React from 'react';
import { MoreVertical, Layers } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';

const sectorIcons = ['📊', '🔬', '🏛️', '💡', '🌍', '📈', '⚡', '🏭'];
const sectorColors = ['#EA5455', '#7367F0', '#28C76F', '#00CFE8', '#FF9F43', '#7367F0', '#28C76F', '#EA5455'];

const ActiveProjectsCard = ({ data, sectors = [] }) => {
    const { isDark } = useTheme();

    const projects = sectors && sectors.length > 0
        ? sectors.slice(0, 6).map((s, index) => ({
            name: s._id || 'Unknown',
            subtitle: `${s.count || 0} records`,
            progress: Math.min(100, Math.round((s.avgIntensity || 0) * 10)),
            color: sectorColors[index % sectorColors.length],
            icon: sectorIcons[index % sectorIcons.length],
        }))
        : (data || [
            { name: 'Energy', subtitle: '45 records', progress: 65, color: '#EA5455', icon: '⚡' },
            { name: 'Technology', subtitle: '32 records', progress: 86, color: '#7367F0', icon: '💡' },
        ]);

    const avgCompleted = projects.length > 0
        ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
        : 0;

    return (
        <div className={`rounded-xl p-5 h-full ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Top Sectors</h3>
                    <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Average Intensity {avgCompleted}%</p>
                </div>
                <div className={`p-2 rounded-lg ${isDark ? 'bg-[#7367F0]/10' : 'bg-purple-50'}`}>
                    <Layers className="w-5 h-5 text-[#7367F0]" />
                </div>
            </div>

            <div className="space-y-4">
                {projects.map((project, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${isDark ? 'bg-[#25293C]' : 'bg-gray-100'}`}>
                            {project.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className={`font-medium truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>{project.name.length > 15 ? project.name.substring(0, 15) + '...' : project.name}</p>
                            <p className={`text-sm truncate ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>{project.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={`w-24 h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#25293C]' : 'bg-gray-200'}`}>
                                <div
                                    className="h-full rounded-full transition-all"
                                    style={{
                                        width: `${project.progress}%`,
                                        backgroundColor: project.color
                                    }}
                                />
                            </div>
                            <span className={`text-sm font-medium w-10 text-right ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                {project.progress}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActiveProjectsCard;
