import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { patternsData } from '../data/patterns';
import Button from './Button';

const PatternCategoryLayout = ({ category, title, color }) => {
  // Filter patterns for this specific page
  const patterns = patternsData.filter(p => p.type === category);
  
  // State to track which pattern is selected
  const [selectedPattern, setSelectedPattern] = useState(patterns[0] || null);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800">
        <h1 className={`text-3xl font-bold ${color}`}>{title}</h1>
        <Link to="/">
            <Button label="Back Home" color="bg-slate-700" hoverColor="hover:bg-slate-600" />
        </Link>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar List */}
        <div className="w-1/4 bg-slate-800 border-r border-slate-700 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-slate-400 text-sm font-bold uppercase mb-4 tracking-wider">Available Patterns</h2>
            <div className="space-y-2">
              {patterns.map((pattern, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPattern(pattern)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                    selectedPattern?.name === pattern.name
                      ? "bg-slate-700 border-l-4 " + color.replace('text-', 'border-') + " text-white"
                      : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                  }`}
                >
                  {pattern.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 overflow-y-auto bg-slate-900">
          {selectedPattern ? (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl text-slate-100 font-bold mb-6">{selectedPattern.name}</h2>
              
              {/* Description */}
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-8 shadow-lg">
                <h3 className="text-xl font-bold text-slate-200 mb-4 border-b border-slate-700 pb-2">Description</h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {selectedPattern.description}
                </p>
              </div>

              {/* Two Column Layout for UML and Code */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Code Example */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg flex flex-col">
                  <div className="bg-slate-950 p-3 border-b border-slate-700">
                    <span className="text-slate-400 font-mono text-sm">Example Implementation (JS)</span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-sm font-mono text-emerald-400 bg-slate-950/50 flex-1">
                    {selectedPattern.code}
                  </pre>
                </div>

                {/* UML Diagram */}
                <div className="bg-slate-200 rounded-xl border border-slate-700 overflow-hidden shadow-lg flex flex-col">
                   <div className="bg-slate-300 p-3 border-b border-slate-400">
                    <span className="text-slate-800 font-mono text-sm font-bold">UML Diagram</span>
                  </div>
                  <div className="p-4 flex items-center justify-center bg-white flex-1 min-h-[300px]">
                    {selectedPattern.umlUrl ? (
                        <img 
                            src={selectedPattern.umlUrl} 
                            alt={`${selectedPattern.name} UML`} 
                            className="max-w-full h-auto object-contain"
                        />
                    ) : (
                        <div className="text-slate-400 italic">No Diagram Available</div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500">
              Select a pattern from the sidebar to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatternCategoryLayout;