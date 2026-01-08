import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { ChevronDown, ChevronUp, Layers, Check, X, Clock } from 'lucide-react';

const ModuleCard = ({ module }) => {
    return (
        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <div className="flex-1">
                <h4 className="text-sm font-medium text-slate-200">{module.moduleName}</h4>
                <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                        <Check size={12} className="text-emerald-500" /> {module.totalCorrect}
                    </span>
                    <span className="flex items-center gap-1">
                        <X size={12} className="text-rose-500" /> {module.totalIncorrect}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock size={12} className="text-indigo-400" /> {Math.round(module.totalTime / 60)}m
                    </span>
                </div>
            </div>

            <div className="text-right">
                <div className="text-sm font-bold text-white mb-1">
                    {module.accuracy}%
                </div>
                <div className="w-24 h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-indigo-500"
                        style={{ width: `${module.coverage || 0}%` }}
                    />
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                    {module.coverage}% Coverage
                </div>
            </div>
        </div>
    );
};

const SubjectGroup = ({ subject }) => {
    const [isOpen, setIsOpen] = useState(false);
    const modules = subject.modules || [];

    return (
        <div className="glass-card overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                        <Layers size={24} />
                    </div>
                    <div className="text-left">
                        <h3 className="text-lg font-bold text-white">{subject.subjectName}</h3>
                        <p className="text-sm text-slate-400">{modules.length} Modules</p>
                    </div>
                </div>
                <div>
                    {isOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                </div>
            </button>

            {isOpen && (
                <div className="p-6 pt-0 space-y-3 border-t border-white/5 bg-black/10">
                    <div className="h-4"></div> {/* Spacer */}
                    {modules.length > 0 ? (
                        modules.map((mod, idx) => (
                            <ModuleCard key={idx} module={mod} />
                        ))
                    ) : (
                        <p className="text-slate-500 italic text-sm text-center py-4">No modules found for this subject.</p>
                    )}
                </div>
            )}
        </div>
    );
};

const ModulesView = () => {
    const { currentStudent } = useData();
    const subjectStats = currentStudent?.modules?.stats || [];

    return (
        <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <h2 className="text-3xl font-bold text-white">Module Breakdown</h2>
            <p className="text-slate-400">Detailed performance analysis by topic.</p>

            <div className="space-y-4">
                {subjectStats.map((subject, idx) => (
                    <SubjectGroup key={idx} subject={subject} />
                ))}
            </div>
        </div>
    );
};

export default ModulesView;
