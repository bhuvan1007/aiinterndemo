import React from 'react';
import { useData } from '../contexts/DataContext';
import { Book, CheckCircle, AlertCircle, BarChart as BarChartIcon } from 'lucide-react';

const SubjectsView = () => {
    const { currentStudent } = useData();
    const subjects = currentStudent?.subjects?.stats || [];

    return (
        <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <h2 className="text-3xl font-bold text-white">Subject Performance Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((sub, idx) => (
                    <div key={idx} className="glass-card p-6 flex flex-col justify-between hover:border-indigo-500/50 transition-colors group">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
                                    <Book size={24} />
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${sub.accuracy > 70 ? 'bg-emerald-500/10 text-emerald-400' :
                                        sub.accuracy > 40 ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                                    }`}>
                                    {sub.accuracy}% Accuracy
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">{sub.subjectName}</h3>

                            <div className="space-y-3 mt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400 flex items-center gap-2">
                                        <CheckCircle size={14} /> Correct
                                    </span>
                                    <span className="text-white font-medium">{sub.totalCorrect}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400 flex items-center gap-2">
                                        <AlertCircle size={14} /> Incorrect
                                    </span>
                                    <span className="text-white font-medium">{sub.totalIncorrect}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400 flex items-center gap-2">
                                        <BarChartIcon size={14} /> Targeted
                                    </span>
                                    <span className="text-white font-medium">{sub.totalQuestions} Qs</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-slate-500">Coverage</span>
                                <span className="text-xs text-white">{sub.coverage || 0}%</span>
                            </div>
                            <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                    style={{ width: `${sub.coverage || 0}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubjectsView;
