import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import questionsData from './questions/questions.json';
import Button from './components/Button';

const Question = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 1. Get categories passed from Homepage (default to empty array if undefined)
    const selectedCategories = location.state?.categories || [];

    // 2. Filter questions based on selection
    // If no category selected (user navigated directly), we show ALL questions as a fallback
    const filteredQuestions = questionsData.filter(q => {
        // Always ensure it's 'mc' type as per previous request
        if (q.type !== 'mc') return false;
        
        // If user selected specific categories, filter by them
        if (selectedCategories.length > 0) {
            return selectedCategories.includes(q.category);
        }
        return true; 
    });

    const [availableQuestions, setAvailableQuestions] = useState([]);
    const [currentQ, setCurrentQ] = useState(null);
    
    // New State for "Check Answer" logic
    const [selectedOption, setSelectedOption] = useState(null);
    const [hasChecked, setHasChecked] = useState(false); // Controls when to show Green/Red
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        resetQuiz();
    }, []);

    const resetQuiz = () => {
        const freshDeck = [...filteredQuestions];
        
        // If user filtered too much and we have 0 questions
        if (freshDeck.length === 0 && selectedCategories.length > 0) {
             // Handle edge case (optional)
        }

        setAvailableQuestions(freshDeck);
        setIsGameOver(false);
        setHasChecked(false);
        setSelectedOption(null);
        
        pickRandomFromDeck(freshDeck);
    };

    const pickRandomFromDeck = (currentDeck) => {
        if (currentDeck.length === 0) {
            setIsGameOver(true);
            return;
        }

        const randomIndex = Math.floor(Math.random() * currentDeck.length);
        const selectedQuestion = currentDeck[randomIndex];

        setCurrentQ(selectedQuestion);

        // Remove picked question from deck
        const newDeck = currentDeck.filter((_, index) => index !== randomIndex);
        setAvailableQuestions(newDeck);

        // Reset UI for new question
        setSelectedOption(null);
        setHasChecked(false);
    };

    const handleCheckAnswer = () => {
        if (!selectedOption) return;
        setHasChecked(true); // This triggers the color reveal
    };

    const handleNext = () => {
        pickRandomFromDeck(availableQuestions);
    };

    const getOptionClasses = (option) => {
        const baseClasses = "w-full p-4 rounded-lg border-2 text-left transition-all duration-200 font-semibold ";
        
        // Case 1: Answer has been checked (Game Reveal)
        if (hasChecked) {
            if (option === currentQ.answer) {
                 return baseClasses + "border-lime-500 bg-lime-900/20 text-lime-400"; // Correct Answer always Green
            }
            if (selectedOption === option && option !== currentQ.answer) {
                 return baseClasses + "border-red-500 bg-red-900/20 text-red-400"; // Wrong pick Red
            }
            return baseClasses + "border-slate-600 bg-slate-800 opacity-50"; // Other irrelevant options dimmed
        }

        // Case 2: User is selecting (Before Reveal)
        if (selectedOption === option) {
            // Highlight selected option in Blue or neutral color to show "Selected" state
            return baseClasses + "border-indigo-500 bg-indigo-900/20 text-indigo-300"; 
        }

        // Default state
        return baseClasses + "border-slate-600 hover:border-slate-400 bg-slate-800 text-slate-200 hover:bg-slate-700";
    };

    // --- RENDER: NO QUESTIONS FOUND (Category mismatch) ---
    if (filteredQuestions.length === 0 && availableQuestions.length === 0 && !currentQ) {
         return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-slate-100">
                <p>No questions found for the selected categories.</p>
                <div className="mt-4" onClick={() => navigate('/')}>
                    <Button label="Go Back" color="bg-slate-600" />
                </div>
            </div>
         );
    }

    // --- RENDER: GAME OVER ---
    if (isGameOver) {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-center">
                <h2 className="text-4xl text-slate-100 font-bold mb-4">Quiz Completed!</h2>
                <Button label="Home" onClick={() => navigate('/')} color="bg-lime-600" hoverColor="hover:bg-lime-500" />
            </div>
        );
    }

    if (!currentQ) return <div className="h-screen bg-slate-900 text-slate-100 flex items-center justify-center">Loading...</div>;

    // --- RENDER: MAIN QUIZ ---
    return(
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-slate-800/50 p-8 rounded-2xl shadow-xl border border-slate-700">
                
                <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-400 text-sm uppercase tracking-wider font-bold">
                        {currentQ.category}
                    </span>
                    <span className="text-slate-500 text-xs font-mono">
                        Remaining: {availableQuestions.length}
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
                            disabled={hasChecked} // Lock buttons after checking
                        >
                            {opt}
                        </button>
                    ))}
                </div>

                <div className="h-16 flex items-center justify-end border-t border-slate-700 pt-6">
                    {/* BUTTON LOGIC:
                        1. Show "Check Answer" if option selected AND not checked yet 
                        2. Show "Next" (or Finish) if checked
                    */}
                    
                    {!hasChecked && (
                        <div className={!selectedOption ? 'opacity-50 pointer-events-none' : ''}>
                             <Button 
                                label="Check Answer" 
                                onClick={handleCheckAnswer} 
                                color="bg-blue-600" 
                                hoverColor="hover:bg-blue-500" 
                            />
                        </div>
                    )}

                    {hasChecked && (
                        <Button 
                            label={availableQuestions.length === 0 ? "Finish" : "Next Question"} 
                            onClick={handleNext} 
                            color="bg-lime-600" 
                            hoverColor="hover:bg-lime-500" 
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Question;