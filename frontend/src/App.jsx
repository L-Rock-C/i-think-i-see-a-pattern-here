import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Question from './Question';
import Results from './Results'; 
import Creational from './patterns/Creational';
import Structural from './patterns/Structural';
import Behavorial from './patterns/Behavorial';

const App = () => {
    return (
        <div className='h-screen'>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/question" element={<Question />} />
                <Route path="/results" element={<Results />} /> 
                <Route path="/creational" element={<Creational />} />
                <Route path="/structural" element={<Structural />} />
                <Route path="/behavorial" element={<Behavorial />} />
            </Routes>
        </div>
    );
}

export default App;