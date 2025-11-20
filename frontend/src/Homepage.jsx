import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PatternSelection from './components/PatternSelection';
import Button from './components/Button';

const Homepage = () => {
    const [selectPatternC, setSelectPatternC] = useState(false);
    const [selectPatternS, setSelectPatternS] = useState(false);
    const [selectPatternB, setSelectPatternB] = useState(false);

    return (
        <div className="h-screen flex flex-col bg-slate-900 justify-around items-center">
            <div className='text-slate-100 flex flex-col items-center'>
                <h1 className='text-4xl mb-10'>I Think I See a Pattern Here</h1>
                <p>Select the types of patterns you want to practice your recognition:</p>
            </div>

            <div className='flex justify-center items-center gap-8'>
                <PatternSelection type="Creational Patterns" selected={selectPatternC} onClick={() => setSelectPatternC(!selectPatternC)}>
                    Creational design patterns provide various object creation mechanisms, which increase flexibility and reuse of existing code.
                </PatternSelection>
                <PatternSelection type="Structural Patterns" selected={selectPatternS} onClick={() => setSelectPatternS(!selectPatternS)}>
                    Structural design patterns explain how to assemble objects and classes  into larger structures, while keeping these structures flexible and  efficient.
                </PatternSelection>
                <PatternSelection type="Behavorial Patterns" selected={selectPatternB} onClick={() => setSelectPatternB(!selectPatternB)}>
                    Behavioral design patterns are concerned with algorithms and the assignment of responsibilities between objects.
                </PatternSelection>
            </div>

            <Link to="/question">
                <Button color="bg-lime-500" hoverColor="hover:bg-lime-400">
                    Start
                </Button>
            </Link>
        </div>
    );
}

export default Homepage;