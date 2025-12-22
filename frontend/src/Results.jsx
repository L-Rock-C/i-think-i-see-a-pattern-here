import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './components/Button';
import { saveSessionResults, getWeakestCategories } from './utils/historyManager';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [historyStats, setHistoryStats] = useState([]);
    
    // Verifica se há dados de sessão passados pela navegação
    const sessionLog = location.state?.sessionLog || null;
    
    // Cálculos da Sessão (apenas se sessionLog existir)
    const correctCount = sessionLog ? sessionLog.filter(l => l.isCorrect).length : 0;
    const scorePercentage = sessionLog && sessionLog.length > 0 ? Math.round((correctCount / sessionLog.length) * 100) : 0;

    useEffect(() => {
        if (sessionLog) {
            // Se veio de um quiz, salva o resultado
            saveSessionResults(sessionLog);
        }
        // Carrega o histórico sempre
        setHistoryStats(getWeakestCategories());
    }, [sessionLog]);

    const getBarColor = (accuracy) => {
        if (accuracy >= 80) return 'bg-lime-500';
        if (accuracy >= 50) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-slate-100">
            <div className="max-w-3xl w-full bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700">
                <h1 className="text-4xl font-bold mb-6 text-center">
                    {sessionLog ? "Quiz Completed!" : "Performance History"}
                </h1>
                
                {/* Resumo da Sessão (Só aparece se o usuário acabou de jogar) */}
                {sessionLog && (
                    <div className="text-center mb-8 pb-8 border-b border-slate-700">
                        <p className="text-lg text-slate-400">Session Score</p>
                        <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">
                            {scorePercentage}%
                        </div>
                        <p className="mt-2 text-slate-400">You got {correctCount} out of {sessionLog.length} correct.</p>
                    </div>
                )}

                {/* Análise de Histórico Geral */}
                <h2 className="text-xl font-bold mb-4">Overall Performance</h2>
                {historyStats.length === 0 ? (
                    <p className="text-center text-slate-500 my-10">No history available yet. Play a quiz!</p>
                ) : (
                    <div className="space-y-4 mb-8">
                        {historyStats.map((cat) => (
                            <div key={cat.name} className="flex flex-col">
                                <div className="flex justify-between mb-1">
                                    <span className="font-semibold">{cat.name}</span>
                                    <span className="text-sm text-slate-400">
                                        {Math.round(cat.accuracy)}% Accuracy ({cat.correct}/{cat.total})
                                    </span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2.5">
                                    <div 
                                        className={`h-2.5 rounded-full ${getBarColor(cat.accuracy)} transition-all duration-500`} 
                                        style={{ width: `${cat.accuracy}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex justify-center gap-4">
                    <Button label="Back to Home" onClick={() => navigate('/')} color="bg-slate-600" hoverColor="hover:bg-slate-500" />
                </div>
            </div>
        </div>
    );
};

export default Results;