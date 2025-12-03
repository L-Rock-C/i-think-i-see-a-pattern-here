import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Question from './Question';
import Creational from './patterns/Creational';
import Structural from './patterns/Structural';
import Behavorial from './patterns/Behavorial';

const App = () => {
    return (
        <div className='h-screen'>
        {/* The Routes component acts as a switch */}
        <Routes>
            {/* Route for the Homepage (root URL) */}
            <Route path="/" element={<Homepage />} />
            
            {/* Route for the Questions page */}
            <Route path="/question" element={<Question />} />

            {/* Route for the Patterns page */}
            <Route path="/creational" element={<Creational />} />
            <Route path="/structural" element={<Structural />} />
            <Route path="/behavorial" element={<Behavorial />} />
        </Routes>
        </div>
    );
}

export default App;