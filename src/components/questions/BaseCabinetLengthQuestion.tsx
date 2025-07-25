import React, { useState } from 'react';
import { QuestionWrapper } from '../common/QuestionWrapper';
import { useQuote } from '../../hooks/useQuote';

export const BaseCabinetLengthQuestion: React.FC = () => {
  const { state, dispatch } = useQuote();
  const [error, setError] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setError('');
    
    if (event.target.value === '') {
      dispatch({ type: 'SET_BASE_CABINET_LENGTH', payload: 0 });
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
    
    dispatch({ type: 'SET_BASE_CABINET_LENGTH', payload: value });
  };

  return (
    <QuestionWrapper
      title="Base Cabinet Length"
      description="What is the total length of wall that will receive base cabinets?"
      error={error}
      helpText="Measure the length of all walls where you plan to install base (lower) cabinets. Round to the nearest foot."
    >
      <div className="form-group">
        <label htmlFor="baseCabinetLength" className="form-label">
          Total length (feet)
        </label>
        <div className="relative">
          <input
            id="baseCabinetLength"
            type="number"
            min="0"
            step="1"
            value={state.baseCabinetLength || ''}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter length in feet"
            aria-describedby="baseCabinetLength-help"
            autoFocus
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            ft
          </span>
        </div>
        <div id="baseCabinetLength-help" className="text-sm text-secondary mt-2">
          Include all walls with base cabinets, but don't include spaces for appliances like dishwashers or ranges
        </div>
      </div>
    </QuestionWrapper>
  );
}; 