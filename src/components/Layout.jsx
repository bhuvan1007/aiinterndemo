import React from 'react';
import { LayoutDashboard, BookOpen, Clock, User, LogOut } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
    ${active
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
    >
        <Icon size={20} className={active ? 'text-indigo-400' : 'text-slate-500 group-hover:text-white'} />
        <span className="font-medium">{label}</span>
    </button>
);

const Layout = ({ children, currentView, onNavigate }) => {
    const { currentStudent } = useData();

    return (
        <div className="flex h-screen overflow-hidden text-slate-200">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 glass-card m-4 mr-0 flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold tracking-tight">
                        <span className="text-gradient">EduAnalytics</span>
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">Student Performance Dashboard</p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <SidebarItem
                        icon={LayoutDashboard}
                        label="Overview"
                        active={currentView === 'overview'}
                        onClick={() => onNavigate('overview')}
                    />
                    <SidebarItem
                        icon={BookOpen}
                        label="Subjects"
                        active={currentView === 'subjects'}
                        onClick={() => onNavigate('subjects')}
                    />
                    <SidebarItem
                        icon={Clock}
                        label="Time Analysis"
                        active={currentView === 'time'}
                        onClick={() => onNavigate('time')}
                    />
                </nav>

                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                            <User size={20} />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate text-white">
                                {currentStudent?.user?.name || "Loading..."}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                                Grade {currentStudent?.overall?.stats?.grade}
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
