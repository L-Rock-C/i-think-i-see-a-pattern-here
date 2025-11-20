import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Question from './Question';

const App = () => {
    return (
        <div className='h-screen'>
        {/* The Routes component acts as a switch */}
        <Routes>
            {/* Route for the Homepage (root URL) */}
            <Route path="/" element={<Homepage />} />
            
            {/* Route for the Questions page */}
            <Route path="/question" element={<Question />} />
        </Routes>
        </div>
    );
}

export default App;