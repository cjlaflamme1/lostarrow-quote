import React, { useState } from 'react';
import { QuestionWrapper } from '../common/QuestionWrapper';
import { useQuote } from '../../hooks/useQuote';

export const WallCabinetLengthQuestion: React.FC = () => {
  const { state, dispatch } = useQuote();
  const [error, setError] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setError('');
    
    if (event.target.value === '') {
      dispatch({ type: 'SET_WALL_CABINET_LENGTH', payload: 0 });
      return;
    }
    
    if (isNaN(value) || value < 0) {
      setError('Please enter a valid positive number');
      return;
    }
    
    if (value > 1000) {
      setError('Length seems unusually long. Please verify the measurement.');
      return;
    }
    
    dispatch({ type: 'SET_WALL_CABINET_LENGTH', payload: value });
  };

  return (
    <QuestionWrapper
      title="Wall Cabinet Length"
      description="What is the total length of wall that will receive wall (upper) cabinets?"
      error={error}
      helpText="Measure the length of all walls where you plan to install wall/upper cabinets. These are the cabinets mounted on the wall above your countertops."
    >
      <div className="form-group">
        <label htmlFor="wallCabinetLength" className="form-label">
          Total length (feet)
        </label>
        <div className="relative">
          <input
            id="wallCabinetLength"
            type="number"
            min="0"
            step="1"
            value={state.wallCabinetLength || ''}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter length in feet"
            aria-describedby="wallCabinetLength-help"
            autoFocus
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            ft
          </span>
        </div>
        <div id="wallCabinetLength-help" className="text-sm text-secondary mt-2">
          Wall cabinets are typically shorter than base cabinet runs due to windows, range hoods, etc.
        </div>
      </div>

      {/* Visual helper showing both base and wall cabinet costs */}
      {(state.baseCabinetLength > 0 || state.wallCabinetLength > 0) && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
          <div className="text-sm font-medium text-blue-900 mb-2">
            Running Total:
          </div>
          <div className="space-y-1 text-sm text-blue-800">
            {state.baseCabinetLength > 0 && (
              <div>Base cabinets: {state.baseCabinetLength} ft × ${state.pricePerFoot}/ft = ${(state.baseCabinetLength * state.pricePerFoot).toLocaleString()}</div>
            )}
            {state.wallCabinetLength > 0 && (
              <div>Wall cabinets: {state.wallCabinetLength} ft × ${state.pricePerFoot}/ft = ${(state.wallCabinetLength * state.pricePerFoot).toLocaleString()}</div>
            )}
            <div className="border-t border-blue-300 pt-1 font-medium">
              Subtotal: ${((state.baseCabinetLength + state.wallCabinetLength) * state.pricePerFoot).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </QuestionWrapper>
  );
}; 