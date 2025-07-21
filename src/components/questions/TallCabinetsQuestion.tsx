import React, { useState } from 'react';
import { QuestionWrapper } from '../common/QuestionWrapper';
import { useQuote } from '../../hooks/useQuote';

export const TallCabinetsQuestion: React.FC = () => {
  const { state, dispatch } = useQuote();
  const [error, setError] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setError('');
    
    if (event.target.value === '') {
      dispatch({ type: 'SET_TALL_CABINETS_COUNT', payload: 0 });
      return;
    }
    
    if (isNaN(value) || value < 0) {
      setError('Please enter a valid number (0 or greater)');
      return;
    }
    
    if (value > 20) {
      setError('That seems like a lot of tall cabinets. Please verify the count.');
      return;
    }
    
    dispatch({ type: 'SET_TALL_CABINETS_COUNT', payload: value });
  };

  const tallCabinetCost = state.tallCabinetsCount * state.pricePerFoot * 6;

  return (
    <QuestionWrapper
      title="Tall Cabinets"
      description="How many tall cabinets (over 4 feet) will you have?"
      error={error}
      helpText="Tall cabinets include pantries, broom closets, and other full-height storage units. Enter 0 if you won't have any."
    >
      <div className="form-group">
        <label htmlFor="tallCabinetsCount" className="form-label">
          Number of tall cabinets
        </label>
        <div className="relative">
          <input
            id="tallCabinetsCount"
            type="number"
            min="0"
            step="1"
            value={state.tallCabinetsCount || ''}
            onChange={handleChange}
            className="form-control"
            placeholder="0"
            aria-describedby="tallCabinetsCount-help"
            autoFocus
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            cabinets
          </span>
        </div>
        <div id="tallCabinetsCount-help" className="text-sm text-secondary mt-2">
          Each tall cabinet is calculated as 6 linear feet due to their size and complexity
        </div>
      </div>

      {/* Examples section */}
      <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
        <div className="text-sm font-medium text-gray-900 mb-2">
          Examples of tall cabinets:
        </div>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Pantry cabinets (food storage)</li>
          <li>• Broom/utility closets</li>
          <li>• Pull-out trash cabinets</li>
          <li>• Full-height storage units</li>
          <li>• Oven/microwave towers</li>
        </ul>
      </div>

      {/* Cost calculation preview */}
      {state.tallCabinetsCount > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
          <div className="text-sm font-medium text-blue-900 mb-2">
            Tall Cabinet Calculation:
          </div>
          <div className="space-y-1 text-sm text-blue-800">
            <div>{state.tallCabinetsCount} cabinet{state.tallCabinetsCount !== 1 ? 's' : ''} × ${state.pricePerFoot}/ft × 6 ft each = ${tallCabinetCost.toLocaleString()}</div>
            <div className="text-xs text-blue-600 mt-1">
              Each tall cabinet counts as 6 linear feet due to increased materials and labor
            </div>
          </div>
        </div>
      )}
    </QuestionWrapper>
  );
}; 