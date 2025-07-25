import React from 'react';
import { useQuote } from '../../hooks/useQuote';
import { TOTAL_STEPS } from '../../constants/steps';

interface NavigationButtonsProps {
  onNext?: () => void;
  onBack?: () => void;
  nextLabel?: string;
  backLabel?: string;
  showSubmit?: boolean;
  onSubmit?: () => void;
  isLoading?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onNext,
  onBack,
  nextLabel = 'Next',
  backLabel = 'Back',
  showSubmit = false,
  onSubmit,
  isLoading = false
}) => {
  const { currentStep, canGoNext, canGoBack, goNext, goBack } = useQuote();
  
  const isLastStep = currentStep >= TOTAL_STEPS - 1;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      goNext();
    }
  };

  // Skip navigation buttons on quote results page
  if (currentStep === TOTAL_STEPS - 1) {
    return null;
  }

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-4">
      {/* Back Button */}
      {currentStep > 0 && (
        <button
          type="button"
          onClick={handleBack}
          disabled={!canGoBack() || isLoading}
          className="btn btn-secondary order-2 sm:order-1"
          aria-label="Go to previous step"
        >
          ← {backLabel}
        </button>
      )}

      {/* Next/Submit Button */}
      <div className="flex-1 order-1 sm:order-2">
        {showSubmit || isLastStep ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="btn btn-success w-full"
            aria-label="Submit quote request"
          >
            {isLoading ? (
              <>
                <span className="spinner" />
                Processing...
              </>
            ) : (
              'Get My Quote'
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canGoNext || isLoading}
            className="btn btn-primary flex-1"
            aria-label="Go to next step"
          >
            {nextLabel} →
          </button>
        )}
      </div>
    </div>
  );
}; 