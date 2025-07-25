import React from 'react';
import { QuestionWrapper } from '../common/QuestionWrapper';
import { useQuote } from '../../hooks/useQuote';

const FINISH_OPTIONS = [
  { 
    value: 'painted' as const, 
    label: 'Painted Finish', 
    multiplier: 1.1,
    description: 'Smooth, solid color finish - popular and versatile',
    examples: 'White, navy, gray, black, custom colors'
  },
  { 
    value: 'clear-stain' as const, 
    label: 'Clear/Stain Finish', 
    multiplier: 1,
    description: 'Natural wood grain visible - classic and timeless',
    examples: 'Cherry, oak, maple, walnut with stain or clear coat'
  }
];

export const CabinetFinishQuestion: React.FC = () => {
  const { state, dispatch } = useQuote();

  const handleChange = (value: typeof state.cabinetFinish) => {
    dispatch({ type: 'SET_CABINET_FINISH', payload: value });
  };

  return (
    <QuestionWrapper
      title="Cabinet Finish"
      description="Will your cabinets have a painted finish, or a clear/stain finish?"
      helpText="Painted finishes require additional prep work and materials, while clear/stain finishes showcase the natural wood grain."
    >
      <div className="radio-group">
        {FINISH_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`radio-option ${state.cabinetFinish === option.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name="cabinetFinish"
              value={option.value}
              checked={state.cabinetFinish === option.value}
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
                Examples: {option.examples}
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Visual examples */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
          <div className="text-sm font-medium text-gray-900 mb-2">✨ Painted Finish Benefits:</div>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>Any color you want</li>
            <li>Modern, clean appearance</li>
          </ul>
        </div>
        
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
          <div className="text-sm font-medium text-gray-900 mb-2">🌿 Clear/Stain Benefits:</div>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>Natural wood beauty</li>
            <li>Timeless appeal</li>
          </ul>
        </div>
      </div>
    </QuestionWrapper>
  );
}; 