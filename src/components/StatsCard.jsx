import React from 'react';

const StatsCard = ({ title, value, subtext, icon: Icon, colorClass = "text-indigo-400", bgClass = "bg-indigo-500/10" }) => {
    return (
        <div className="glass-card p-6 flex items-start space-x-4">
            <div className={`p-3 rounded-xl ${bgClass} ${colorClass}`}>
                <Icon size={24} />
            </div>
            <div>
                <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
                <p className="text-3xl font-bold text-white mt-1">{value}</p>
                {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
            </div>
        </div>
    );
};

export default StatsCard;
