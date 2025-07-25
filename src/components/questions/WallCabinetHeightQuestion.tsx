import React from 'react';
import { QuestionWrapper } from '../common/QuestionWrapper';
import { useQuote } from '../../hooks/useQuote';

const HEIGHT_OPTIONS = [
  { value: 'h30' as const, label: '30 inches', multiplier: 1, description: 'Standard height wall cabinets' },
  { value: 'h36' as const, label: '36 inches', multiplier: 1, description: 'Taller cabinets, more storage' },
  { value: 'h40' as const, label: '40 inches', multiplier: 1.25, description: 'Even more storage space' },
  { value: 'h42plus' as const, label: '42+ inches', multiplier: 1.75, description: 'Maximum height cabinets' }
];

export const WallCabinetHeightQuestion: React.FC = () => {
  const { state, dispatch } = useQuote();

  const handleChange = (value: typeof state.wallCabinetHeight) => {
    dispatch({ type: 'SET_WALL_CABINET_HEIGHT', payload: value });
  };

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
              <div className="radio-label">
                <span>{option.label}</span>
              </div>
              <div className="radio-description">
                {option.description}
              </div>
            </div>
          </label>
        ))}
      </div>
    </QuestionWrapper>
  );
}; 