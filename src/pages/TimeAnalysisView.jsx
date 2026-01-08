import React from 'react';
import { useData } from '../contexts/DataContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const TimeAnalysisView = () => {
    const { currentStudent } = useData();
    const subjects = currentStudent?.subjects?.stats || [];

    // Data for Pie Chart (Time Distribution)
    const timeData = subjects
        .filter(s => s.totalTime > 0)
        .map(s => ({
            name: s.subjectName,
            value: s.totalTime
        }));

    const COLORS = ['#6366f1', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl">
                    <p className="label text-white font-medium">{`${payload[0].name}`}</p>
                    <p className="intro text-indigo-300">{formatTime(payload[0].value)}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-500">
            <h2 className="text-3xl font-bold text-white">Time Analysis</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Time Distribution Pie Chart */}
                <div className="glass-card p-6 min-h-[400px] flex flex-col">
                    <h3 className="text-xl font-semibold text-white mb-6">Time Distribution by Subject</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={timeData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    paddingAngle={5}
                                >
                                    {timeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Average Time per Question */}
                <div className="glass-card p-6 min-h-[400px] flex flex-col">
                    <h3 className="text-xl font-semibold text-white mb-6">Avg Time per Question (Seconds)</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={subjects.filter(s => s.avgTime > 0)}
                                layout="vertical"
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.1)" />
                                <XAxis type="number" stroke="#94a3b8" />
                                <YAxis dataKey="subjectName" type="category" width={100} stroke="#94a3b8" tick={{ fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: '#1e1b4b', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                                />
                                <Bar dataKey="avgTime" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="Avg Time (s)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeAnalysisView;
