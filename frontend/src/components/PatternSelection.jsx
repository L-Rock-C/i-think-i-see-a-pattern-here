import { useState } from 'react';

const PatternSelection = (props) =>{
    const { children, onClick, type, selected  } = props;

    let selectedBorder = selected ? "border-lime-400" : "border-slate-600";

    return(
        <button onClick={onClick} className="text-slate-100 w-80 h-96 bg-slate-600 rounded-lg p-1">
            <div className={`transition duration-200 w-full h-full p-2 border-4 rounded flex flex-col items-center justify-start ${selectedBorder}`}>
                <div className='text-2xl my-10'>{type}</div>
                <div className='flex flex-col items-center'>{children}</div>
                <div></div>
            </div>
        </button>
    );
};

export default PatternSelection;