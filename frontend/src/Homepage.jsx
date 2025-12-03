import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PatternSelection from './components/PatternSelection';
import Button from './components/Button';

const Homepage = () => {
    const [selectPatternC, setSelectPatternC] = useState(true);
    const [selectPatternS, setSelectPatternS] = useState(false);
    const [selectPatternB, setSelectPatternB] = useState(false);
    
    const navigate = useNavigate();

    const handleStart = () => {
        // Build an array of selected categories based on the state
        const selectedCategories = [];
        if (selectPatternC) selectedCategories.push("Creational");
        if (selectPatternS) selectedCategories.push("Structural");
        if (selectPatternB) selectedCategories.push("Behavioral");

        // Navigate to /question and pass the array in state
        navigate('/question', { state: { categories: selectedCategories } });
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

            {/* Changed from Link to a div/button handling the click */}
            <div onClick={handleStart}>
                <Button label="Start" color="bg-lime-500" hoverColor="hover:bg-lime-400" />
            </div>
        </div>
    );
}

export default Homepage;