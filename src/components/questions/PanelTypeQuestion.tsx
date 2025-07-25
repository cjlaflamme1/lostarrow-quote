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

  return (
    <QuestionWrapper
      title="Panel Type"
      description="Will the center panel be raised or flat?"
      helpText="This affects the milling complexity and final appearance of your cabinet doors."
    >
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
              <div className="radio-label">
                <span>{option.label}</span>
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

      {/* Visual comparison */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
          <div className="text-sm font-medium text-gray-900 mb-2">▢ Flat Panel:</div>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>Panel flush with frame</li>
            <li>Clean, simple lines</li>
            <li>Modern appearance</li>
            <li>Less expensive option</li>
            <li>Popular Shaker style</li>
          </ul>
        </div>
        
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
          <div className="text-sm font-medium text-gray-900 mb-2">◪ Raised Panel:</div>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>Panel raised above frame</li>
            <li>Traditional detail</li>
            <li>Formal appearance</li>
            <li>Additional milling work</li>
            <li>Classic cabinet style</li>
          </ul>
        </div>
      </div>
    </QuestionWrapper>
  );
}; 