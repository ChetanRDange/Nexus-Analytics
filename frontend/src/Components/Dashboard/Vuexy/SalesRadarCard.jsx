import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '../../../ThemeContext';

const SalesRadarCard = ({ data, pestle = [] }) => {
    const { isDark } = useTheme();

    // Use PESTLE data if available
    const chartData = pestle && pestle.length > 0
        ? pestle.slice(0, 6).map(p => ({
            subject: (p._id || 'N/A').substring(0, 4),
            intensity: p.avgIntensity || 0,
            likelihood: p.avgLikelihood || 0,
        }))
        : (data || [
            { subject: 'Pol', intensity: 80, likelihood: 60 },
            { subject: 'Eco', intensity: 90, likelihood: 75 },
            { subject: 'Soc', intensity: 70, likelihood: 85 },
            { subject: 'Tech', intensity: 85, likelihood: 70 },
            { subject: 'Leg', intensity: 65, likelihood: 90 },
            { subject: 'Env', intensity: 75, likelihood: 80 },
        ]);

    return (
        <div className={`rounded-xl p-5 h-full ${isDark ? 'bg-[#2F3349]' : 'bg-white shadow-sm'}`}>
            <div className="mb-4">
                <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>PESTLE Analysis</h3>
                <p className={`text-sm ${isDark ? 'text-[#6B6D8C]' : 'text-gray-500'}`}>Category Breakdown</p>
            </div>

            <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={chartData} outerRadius="70%">
                        <PolarGrid stroke={isDark ? '#3B3F5C' : '#E5E7EB'} />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={{ fill: isDark ? '#6B6D8C' : '#6B7280', fontSize: 12 }}
                        />
                        <Radar
                            name="Intensity"
                            dataKey="intensity"
                            stroke="#7367F0"
                            fill="#7367F0"
                            fillOpacity={0.3}
                            strokeWidth={2}
                        />
                        <Radar
                            name="Likelihood"
                            dataKey="likelihood"
                            stroke="#00CFE8"
                            fill="#00CFE8"
                            fillOpacity={0.3}
                            strokeWidth={2}
                        />
                        <Legend
                            wrapperStyle={{ color: isDark ? '#A3A4CC' : '#6B7280' }}
                            formatter={(value) => <span style={{ color: isDark ? '#A3A4CC' : '#6B7280' }}>{value}</span>}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesRadarCard;
