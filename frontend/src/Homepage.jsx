import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PatternSelection from './components/PatternSelection';
import Button from './components/Button';

const Homepage = () => {
    const [selectPatternC, setSelectPatternC] = useState(true);
    const [selectPatternS, setSelectPatternS] = useState(false);
    const [selectPatternB, setSelectPatternB] = useState(false);
    
    // Novo estado para quantidade de perguntas
    const [questionCount, setQuestionCount] = useState(5);

    const navigate = useNavigate();

    const handleStart = () => {
        const selectedCategories = [];
        if (selectPatternC) selectedCategories.push("Creational");
        if (selectPatternS) selectedCategories.push("Structural");
        if (selectPatternB) selectedCategories.push("Behavioral");

        // Passa categorias E o limite de perguntas
        navigate('/question', { 
            state: { 
                categories: selectedCategories,
                limit: questionCount 
            } 
        });
    };

    return (
        <div className="h-screen flex flex-col bg-slate-900 justify-around items-center">
            <div className='text-slate-100 flex flex-col items-center'>
                <h1 className='text-4xl mb-10'>I Think I See a Pattern Here</h1>
                <p>Select the types of patterns you want to practice your recognition:</p>
            </div>

            <div className='flex justify-around items-center gap-8'>
                <PatternSelection type="Creational Patterns" selected={selectPatternC} onClick={() => setSelectPatternC(!selectPatternC)}>
                    Creational design patterns provide various object creation mechanisms, which increase flexibility and reuse of existing code.
                    <div className='my-8'>
                        <Link to="/creational">
                            <Button label="Read About" color="bg-indigo-500" hoverColor="hover:bg-indigo-400" />
                        </Link>
                    </div>
                </PatternSelection>
                <PatternSelection type="Structural Patterns" selected={selectPatternS} onClick={() => setSelectPatternS(!selectPatternS)}>
                    Structural design patterns explain how to assemble objects and classes  into larger structures, while keeping these structures flexible and  efficient.
                    <div className='my-8'>
                        <Link to="/structural">
                            <Button label="Read About" color="bg-indigo-500" hoverColor="hover:bg-indigo-400" />
                        </Link>
                    </div>
                </PatternSelection>
                <PatternSelection type="Behavioral Patterns" selected={selectPatternB} onClick={() => setSelectPatternB(!selectPatternB)}>
                    Behavioral design patterns are concerned with algorithms and the assignment of responsibilities between objects.
                    <div className='my-8'>
                        <Link to="/behavorial">
                            <Button label="Read About" color="bg-indigo-500" hoverColor="hover:bg-indigo-400" />
                        </Link>
                    </div>
                </PatternSelection>
            </div>

            {/* Alteração: Seletor Numérico */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 w-full max-w-sm mb-8 flex flex-col items-center shadow-lg">
                <label htmlFor="q-amount" className="text-slate-200 block mb-3 font-semibold text-lg">
                    Number of Questions
                </label>
                <div className="relative">
                    <input 
                        id="q-amount"
                        type="number" 
                        min="1" 
                        max="50" 
                        value={questionCount} 
                        onChange={(e) => setQuestionCount(parseInt(e.target.value) || "")}
                        onBlur={(e) => {
                            // Validação simples ao sair do campo
                            let val = parseInt(e.target.value);
                            if (!val || val < 1) setQuestionCount(1);
                        }}
                        className="w-32 p-3 bg-slate-900 text-lime-400 font-bold text-3xl text-center rounded-lg border-2 border-slate-600 focus:border-lime-500 focus:outline-none transition-colors appearance-none"
                    />
                </div>
                <p className="text-slate-500 text-xs mt-3">Type a number (e.g., 5, 10, 20)</p>
            </div>

            {/* Container dos Botões de Ação */}
            <div className="flex gap-4 justify-center items-center w-96">
                <div onClick={() => navigate('/results')} className="flex-1">
                    <Button label="History" color="bg-indigo-600" hoverColor="hover:bg-indigo-500" />
                </div>
                <div onClick={handleStart} className="flex-1">
                    <Button label="Start Quiz" color="bg-lime-500" hoverColor="hover:bg-lime-400" />
                </div>
            </div>
        </div>
    );
}

export default Homepage;