import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import questionsData from './questions/questions.json';
import Button from './components/Button';

const Question = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 1. Receber parâmetros
    const selectedCategories = location.state?.categories || [];
    const questionLimit = location.state?.limit || 100; // Padrão alto se não vier nada

    const [availableQuestions, setAvailableQuestions] = useState([]);
    const [currentQ, setCurrentQ] = useState(null);
    const [sessionLog, setSessionLog] = useState([]); // Log para passar ao Results
    
    // Estados visuais
    const [selectedOption, setSelectedOption] = useState(null);
    const [hasChecked, setHasChecked] = useState(false);

    useEffect(() => {
        setupQuiz();
    }, []);

    const setupQuiz = () => {
        // Filtrar por categoria
        let deck = questionsData.filter(q => {
            if (q.type !== 'mc') return false;
            if (selectedCategories.length > 0) {
                return selectedCategories.includes(q.category);
            }
            return true; 
        });

        // Embaralhar (Algoritmo Fisher-Yates simples)
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }

        // Cortar pelo limite escolhido pelo usuário
        const limitedDeck = deck.slice(0, questionLimit);

        setAvailableQuestions(limitedDeck);
        pickQuestionFromDeck(limitedDeck);
    };

    const pickQuestionFromDeck = (currentDeck) => {
        if (currentDeck.length === 0) {
            finishQuiz();
            return;
        }
        
        // Pega sempre o primeiro já que o deck está embaralhado
        const nextQuestion = currentDeck[0];
        setCurrentQ(nextQuestion);
        
        // Remove do deck
        setAvailableQuestions(currentDeck.slice(1));

        // Reset
        setSelectedOption(null);
        setHasChecked(false);
    };

    const finishQuiz = () => {
        // Navega para a nova tela de resultados enviando o log da sessão
        navigate('/results', { state: { sessionLog } });
    };

    const handleCheckAnswer = () => {
        if (!selectedOption) return;
        
        const isCorrect = selectedOption === currentQ.answer;
        setHasChecked(true);

        // Registra o resultado para histórico
        setSessionLog(prev => [
            ...prev,
            {
                questionId: currentQ.id,
                category: currentQ.category,
                isCorrect: isCorrect
            }
        ]);
    };

    const handleNext = () => {
        pickQuestionFromDeck(availableQuestions);
    };

    const getOptionClasses = (option) => {
        const baseClasses = "w-full p-4 rounded-lg border-2 text-left transition-all duration-200 font-semibold ";
        
        if (hasChecked) {
            if (option === currentQ.answer) return baseClasses + "border-lime-500 bg-lime-900/20 text-lime-400";
            if (selectedOption === option) return baseClasses + "border-red-500 bg-red-900/20 text-red-400";
            return baseClasses + "border-slate-600 bg-slate-800 opacity-50";
        }

        if (selectedOption === option) return baseClasses + "border-indigo-500 bg-indigo-900/20 text-indigo-300"; 
        return baseClasses + "border-slate-600 hover:border-slate-400 bg-slate-800 text-slate-200 hover:bg-slate-700";
    };

    if (!currentQ) return <div className="h-screen bg-slate-900 text-slate-100 flex items-center justify-center">Loading...</div>;

    return(
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-slate-800/50 p-8 rounded-2xl shadow-xl border border-slate-700">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-400 text-sm uppercase tracking-wider font-bold bg-slate-700 px-2 py-1 rounded">
                        {currentQ.category}
                    </span>
                    <span className="text-slate-500 text-xs font-mono">
                         Questions left: {availableQuestions.length}
                    </span>
                </div>

                <h2 className="text-2xl text-slate-100 font-bold mb-10 leading-relaxed">
                    {currentQ.question}
                </h2>

                <div className="grid grid-cols-1 gap-4 mb-8">
                    {currentQ.options.map((opt, index) => (
                        <button 
                            key={index} 
                            onClick={() => !hasChecked && setSelectedOption(opt)}
                            className={getOptionClasses(opt)}
                            disabled={hasChecked}
                        >
                            {opt}
                        </button>
                    ))}
                </div>

                <div className="h-16 flex items-center justify-end border-t border-slate-700 pt-6">
                    {!hasChecked ? (
                        <div className={!selectedOption ? 'opacity-50 pointer-events-none' : ''}>
                             <Button label="Check Answer" onClick={handleCheckAnswer} color="bg-blue-600" hoverColor="hover:bg-blue-500" />
                        </div>
                    ) : (
                        <Button label={availableQuestions.length === 0 ? "See Results" : "Next Question"} onClick={handleNext} color="bg-lime-600" hoverColor="hover:bg-lime-500" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Question;