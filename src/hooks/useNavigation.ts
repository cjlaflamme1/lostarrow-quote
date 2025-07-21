import { useState } from 'react';
import { TOTAL_STEPS } from '../constants/steps';

export interface UseNavigationReturn {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  goNext: () => void;
  goBack: () => void;
  canGoNext: () => boolean;
  canGoBack: () => boolean;
  totalSteps: number;
  isComplete: boolean;
  progressPercentage: number;
}

export const useNavigation = (
  initialStep: number = 0,
  validationFn?: (step: number) => boolean
): UseNavigationReturn => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const canGoNext = (): boolean => {
    if (currentStep >= TOTAL_STEPS - 1) return false;
    return validationFn ? validationFn(currentStep) : true;
  };

  const canGoBack = (): boolean => {
    return currentStep > 0;
  };

  const goNext = (): void => {
    if (canGoNext()) {
      setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS - 1));
    }
  };

  const goBack = (): void => {
    if (canGoBack()) {
      setCurrentStep(prev => Math.max(prev - 1, 0));
    }
  };

  const isComplete = currentStep >= TOTAL_STEPS - 1;
  const progressPercentage = Math.round((currentStep / (TOTAL_STEPS - 1)) * 100);

  return {
    currentStep,
    setCurrentStep,
    goNext,
    goBack,
    canGoNext,
    canGoBack,
    totalSteps: TOTAL_STEPS,
    isComplete,
    progressPercentage
  };
}; 