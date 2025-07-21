import React from 'react';
import { ProgressBar } from './ProgressBar';
import { useQuote } from '../../hooks/useQuote';
import { STEPS } from '../../constants/steps';
import '../../styles/globals.css';
import '../../styles/components.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentStep, state } = useQuote();
  const currentStepConfig = STEPS[currentStep];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container">
          <div className="py-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-xl font-bold text-primary">
                  Cabinet Quote Calculator
                </h1>
                <div className="text-xs text-secondary">
                  Internal Rate: ${state.pricePerFoot}/ft
                </div>
              </div>
              <div className="text-sm text-secondary">
                Step {currentStep + 1} of {STEPS.length}
              </div>
            </div>
            
            <ProgressBar currentStep={currentStep} />
            
            {currentStepConfig && (
              <div className="mt-3">
                <h2 className="text-lg font-semibold text-primary">
                  {currentStepConfig.title}
                </h2>
                <p className="text-sm text-secondary mt-1">
                  {currentStepConfig.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="container">
          <div className="py-6">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="container">
          <div className="py-4 text-center text-sm text-secondary">
            <p>Custom Cabinet Quote Calculator</p>
          </div>
        </div>
      </footer>
    </div>
  );
}; 