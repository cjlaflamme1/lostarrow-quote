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
  const { currentStep, canGoNext, canGoBack, goNext, goBack, state } = useQuote();
  
  const isLastStep = currentStep >= TOTAL_STEPS - 1;
  const isFirstStep = currentStep === 0;
  const isQuoteResultsStep = currentStep === TOTAL_STEPS - 1;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  // Skip navigation buttons on quote results page
  if (isQuoteResultsStep) {
    return null;
  }

  // Special handling for panel type question (only shown if center panel doors)
  const showPanelTypeStep = state.doorType === 'center-panel';
  const shouldSkipPanelType = currentStep === 7 && !showPanelTypeStep;

  const handleNextWithSkip = () => {
    if (onNext) {
      onNext();
    } else {
      goNext();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      {/* Back Button */}
      {!isFirstStep && (
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
            onClick={handleNextWithSkip}
            disabled={!canGoNext() || isLoading}
            className="btn btn-primary w-full"
            aria-label="Go to next step"
          >
            {shouldSkipPanelType ? 'Continue to Profile' : nextLabel} →
          </button>
        )}
      </div>
    </div>
  );
}; 