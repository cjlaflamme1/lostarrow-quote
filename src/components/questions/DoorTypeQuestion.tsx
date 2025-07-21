import React from 'react';
import { QuestionWrapper } from '../common/QuestionWrapper';
import { useQuote } from '../../hooks/useQuote';

const DOOR_TYPE_OPTIONS = [
  { 
    value: 'solid-slab' as const, 
    label: 'Solid Slab', 
    multiplier: 1,
    description: 'Flat, seamless door with no frame or panel',
    style: 'Modern, minimalist, contemporary'
  },
  { 
    value: 'center-panel' as const, 
    label: 'Center Panel', 
    multiplier: 1.1,
    description: 'Traditional door with a frame and center panel',
    style: 'Classic, traditional, versatile'
  }
];

export const DoorTypeQuestion: React.FC = () => {
  const { state, dispatch } = useQuote();

  const handleChange = (value: typeof state.doorType) => {
    dispatch({ type: 'SET_DOOR_TYPE', payload: value });
  };

  const selectedOption = DOOR_TYPE_OPTIONS.find(option => option.value === state.doorType);
  
  // Calculate current cost after finish for door type calculation
  const finishAdjustedCost = state.calculatedValues?.I || 0;
  const doorTypeAdjustedCost = selectedOption ? finishAdjustedCost * selectedOption.multiplier : finishAdjustedCost;

  return (
    <QuestionWrapper
      title="Door Type"
      description="Will the doors be a solid slab of wood, or will they have a center panel?"
      helpText="Door construction affects both appearance and cost. Center panel doors require additional milling and assembly work."
    >
      <div className="radio-group">
        {DOOR_TYPE_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`radio-option ${state.doorType === option.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name="doorType"
              value={option.value}
              checked={state.doorType === option.value}
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
      {finishAdjustedCost > 0 && selectedOption && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
          <div className="text-sm font-medium text-blue-900 mb-2">
            Door Type Adjustment:
          </div>
          <div className="space-y-1 text-sm text-blue-800">
            <div>After finish: ${finishAdjustedCost.toLocaleString()}</div>
            <div>Door type multiplier: ×{selectedOption.multiplier} ({selectedOption.label.toLowerCase()})</div>
            <div className="border-t border-blue-300 pt-1 font-medium">
              After door type: ${doorTypeAdjustedCost.toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* Visual comparison */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
          <div className="text-sm font-medium text-gray-900 mb-2">□ Solid Slab Doors:</div>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Clean, flat surface</li>
            <li>• Modern aesthetic</li>
            <li>• Less expensive option</li>
            <li>• Easy to clean</li>
            <li>• Showcases wood grain or paint</li>
          </ul>
        </div>
        
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
          <div className="text-sm font-medium text-gray-900 mb-2">⬜ Center Panel Doors:</div>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Frame and panel construction</li>
            <li>• Traditional appearance</li>
            <li>• More detailed craftsmanship</li>
            <li>• Adds visual interest</li>
            <li>• Can be raised or flat panel</li>
          </ul>
        </div>
      </div>
    </QuestionWrapper>
  );
}; 