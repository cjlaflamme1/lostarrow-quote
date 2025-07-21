import React from 'react';
import { QuestionWrapper } from '../common/QuestionWrapper';
import { useQuote } from '../../hooks/useQuote';

const HEIGHT_OPTIONS = [
  { value: 'h30' as const, label: '30 inches', multiplier: 1, description: 'Standard height wall cabinets' },
  { value: 'h36' as const, label: '36 inches', multiplier: 1.25, description: 'Taller cabinets, more storage' },
  { value: 'h40' as const, label: '40 inches', multiplier: 1.5, description: 'Even more storage space' },
  { value: 'h42plus' as const, label: '42+ inches', multiplier: 2, description: 'Maximum height, ceiling-mount' }
];

export const WallCabinetHeightQuestion: React.FC = () => {
  const { state, dispatch } = useQuote();

  const handleChange = (value: typeof state.wallCabinetHeight) => {
    dispatch({ type: 'SET_WALL_CABINET_HEIGHT', payload: value });
  };

  const selectedOption = HEIGHT_OPTIONS.find(option => option.value === state.wallCabinetHeight);
  const wallCabinetBaseCost = state.wallCabinetLength * state.pricePerFoot;
  const heightAdjustedCost = selectedOption ? wallCabinetBaseCost * selectedOption.multiplier : wallCabinetBaseCost;

  return (
    <QuestionWrapper
      title="Wall Cabinet Height"
      description="How tall will your wall cabinets be?"
      helpText="Taller cabinets provide more storage but cost more due to additional materials and complexity."
    >
      <div className="radio-group">
        {HEIGHT_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`radio-option ${state.wallCabinetHeight === option.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name="wallCabinetHeight"
              value={option.value}
              checked={state.wallCabinetHeight === option.value}
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
            </div>
          </label>
        ))}
      </div>

      {/* Cost calculation preview */}
      {state.wallCabinetLength > 0 && selectedOption && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
          <div className="text-sm font-medium text-blue-900 mb-2">
            Wall Cabinet Calculation:
          </div>
          <div className="space-y-1 text-sm text-blue-800">
            <div>Base cost: {state.wallCabinetLength} ft × ${state.pricePerFoot}/ft = ${wallCabinetBaseCost.toLocaleString()}</div>
            <div>Height adjustment: ${wallCabinetBaseCost.toLocaleString()} × {selectedOption.multiplier} = ${heightAdjustedCost.toLocaleString()}</div>
            <div className="border-t border-blue-300 pt-1 font-medium">
              Wall cabinet total: ${heightAdjustedCost.toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </QuestionWrapper>
  );
}; 