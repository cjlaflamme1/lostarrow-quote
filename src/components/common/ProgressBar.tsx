import React from 'react';
import { TOTAL_STEPS } from '../../constants/steps';

interface ProgressBarProps {
  currentStep: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const progressPercentage = Math.round((currentStep / (TOTAL_STEPS - 1)) * 100);

  return (
    <div className="w-full">
      <div className="progress">
        <div 
          className="progress-bar"
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progress: ${progressPercentage}% complete`}
        />
      </div>
      <div className="flex justify-between text-xs text-secondary mt-1">
        <span>Start</span>
        <span>{progressPercentage}% Complete</span>
        <span>Quote</span>
      </div>
    </div>
  );
}; 