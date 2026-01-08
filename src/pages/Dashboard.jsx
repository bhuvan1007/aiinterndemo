import React from 'react';
import { useData } from '../contexts/DataContext';
import StatsCard from '../components/StatsCard';
import { Trophy, Target, Clock, Book, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

const Dashboard = () => {
    const { currentStudent, loading } = useData();

    if (loading) return <div className="p-10 text-white">Loading data...</div>;
    if (!currentStudent) return <div className="p-10 text-white">No studnet data selected</div>;

    const { overall, subjects } = currentStudent;
    const stats = overall.stats;

    // Prepare chart data
    const subjectData = subjects.stats.map(sub => ({
        name: sub.subjectName,
        Accuracy: sub.accuracy || 0,
        Mastery: (sub.mastery || 0) * 10, // Scale mastery to 0-100 for comparison if needed, assuming mastery is low number? 
        // Wait, mastery in JSON was "1". If it's 0-10 or 0-100? 
        // In sample: Accuracy 50, Mastery 1. Mastery might be a level 1-10.
        // Let's keep it raw for now or check data dictionary.
        // Looking at JSON again: accuracy 50, mastery 1. It compares poorly if plotted on same axis.
        // I'll plot Accuracy (0-100) and Coverage (0-100) on one chart.
        Coverage: sub.coverage || 0
    })).filter(s => s.Accuracy > 0 || s.Coverage > 0); // Filter out empty subjects

    // Format time
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        return `${hrs}h ${mins}m`;
    };

    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
                    <p className="text-slate-400 mt-1">
                        Welcome back, <span className="text-indigo-400">{currentStudent.user.name}</span>
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-slate-400">Total Learning Time</p>
                    <p className="text-xl font-mono text-white">{formatTime(stats.totalTime)}</p>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Overall Accuracy"
                    value={`${stats.accuracy}%`}
                    icon={Target}
                    colorClass="text-emerald-400"
                    bgClass="bg-emerald-500/10"
                    subtext={`${stats.totalCorrect} / ${stats.attendedTotal} Correct`}
                />
                <StatsCard
                    title="Mastery Level"
                    value={stats.mastery}
                    icon={Trophy}
                    colorClass="text-amber-400"
                    bgClass="bg-amber-500/10"
                    subtext="Current Grade Level"
                />
                <StatsCard
                    title="Questions Solved"
                    value={stats.totalUniqueAttended}
                    icon={Activity}
                    colorClass="text-blue-400"
                    bgClass="bg-blue-500/10"
                    subtext="Unique Questions"
                />
                <StatsCard
                    title="Coverage"
                    value={`${stats.coverage}%`}
                    icon={Book}
                    colorClass="text-rose-400"
                    bgClass="bg-rose-500/10"
                    subtext="Syllabus Completion"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="lg:col-span-2 glass-card p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Subject Performance</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={subjectData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#94a3b8"
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e1b4b', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend />
                                <Bar dataKey="Accuracy" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Coverage" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Detailed Stats / List */}
                <div className="glass-card p-6 flex flex-col">
                    <h3 className="text-lg font-semibold text-white mb-4">Strongest Subjects</h3>
                    <div className="flex-1 overflow-auto space-y-4">
                        {subjectData.sort((a, b) => b.Accuracy - a.Accuracy).slice(0, 5).map((subject, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-200">{subject.name}</p>
                                        <p className="text-xs text-slate-500">{subject.Coverage}% Covered</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-bold text-white">{subject.Accuracy}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
