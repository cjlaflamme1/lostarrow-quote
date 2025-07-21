import React from 'react';
import { QuestionWrapper } from '../common/QuestionWrapper';
import { useQuote } from '../../hooks/useQuote';

const PANEL_TYPE_OPTIONS = [
  { 
    value: 'flat' as const, 
    label: 'Flat Panel', 
    multiplier: 1,
    description: 'Panel sits flush with the frame - clean, simple look',
    style: 'Modern, transitional, Shaker-style'
  },
  { 
    value: 'raised' as const, 
    label: 'Raised Panel', 
    multiplier: 1.05,
    description: 'Panel is raised above the frame - traditional detail',
    style: 'Traditional, formal, classic'
  }
];

export const PanelTypeQuestion: React.FC = () => {
  const { state, dispatch } = useQuote();

  const handleChange = (value: typeof state.panelType) => {
    dispatch({ type: 'SET_PANEL_TYPE', payload: value });
  };

  // This question only appears if center panel doors were selected
  if (state.doorType !== 'center-panel') {
    return (
      <QuestionWrapper
        title="Panel Type"
        description="Skipping panel selection..."
        helpText="Since you selected solid slab doors, there are no panels to configure. Proceeding to door profile selection."
      >
        <div className="text-center py-8">
          <div className="text-6xl mb-4">⏭️</div>
          <h3 className="text-xl font-semibold mb-2">Step Skipped</h3>
          <p className="text-secondary mb-4">
            Solid slab doors don't have center panels, so this step doesn't apply to your selection.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Your Selection:</strong> {state.doorType} doors<br/>
              <strong>Next:</strong> Choose your door profile style
            </p>
          </div>
        </div>
      </QuestionWrapper>
    );
  }

  const selectedOption = PANEL_TYPE_OPTIONS.find(option => option.value === state.panelType);
  
  // Calculate current cost after door type for panel type calculation
  const doorTypeAdjustedCost = state.calculatedValues?.J || 0;
  const panelTypeAdjustedCost = selectedOption ? doorTypeAdjustedCost * selectedOption.multiplier : doorTypeAdjustedCost;

  return (
    <QuestionWrapper
      title="Panel Type"
      description="Will the center panel be raised or flat?"
      helpText="Since you chose center panel doors, we need to know the panel style. This affects the milling complexity and final appearance."
    >
      <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-200">
        <div className="text-sm font-medium text-blue-900 mb-1">
          ✓ Center Panel Doors Selected
        </div>
        <div className="text-xs text-blue-700">
          Now choose the panel style within the door frame
        </div>
      </div>

      <div className="radio-group">
        {PANEL_TYPE_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`radio-option ${state.panelType === option.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name="panelType"
              value={option.value}
              checked={state.panelType === option.value}
              onChange={() => handleChange(option.value)}
              className="radio-input"
            />
            <div className="flex-1">
              <div className="radio-label flex items-center justify-between">
                <span>{option.label}</span>
                <span className="text-sm text-secondary">
                  ×{option.multiplier} multiplier
                </span>
              </div>
              <div className="radio-description">
                {option.description}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                Style: {option.style}
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Cost calculation preview */}
      {doorTypeAdjustedCost > 0 && selectedOption && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
          <div className="text-sm font-medium text-blue-900 mb-2">
            Panel Type Adjustment:
          </div>
          <div className="space-y-1 text-sm text-blue-800">
            <div>After door type: ${doorTypeAdjustedCost.toLocaleString()}</div>
            <div>Panel multiplier: ×{selectedOption.multiplier} ({selectedOption.label.toLowerCase()})</div>
            <div className="border-t border-blue-300 pt-1 font-medium">
              After panel type: ${panelTypeAdjustedCost.toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* Visual comparison */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
          <div className="text-sm font-medium text-gray-900 mb-2">▢ Flat Panel:</div>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Panel flush with frame</li>
            <li>• Clean, simple lines</li>
            <li>• Modern appearance</li>
            <li>• Less expensive option</li>
            <li>• Popular Shaker style</li>
          </ul>
        </div>
        
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
          <div className="text-sm font-medium text-gray-900 mb-2">◪ Raised Panel:</div>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Panel raised above frame</li>
            <li>• Traditional detail</li>
            <li>• Formal appearance</li>
            <li>• Additional milling work</li>
            <li>• Classic cabinet style</li>
          </ul>
        </div>
      </div>
    </QuestionWrapper>
  );
}; 