import React from 'react';
import { QuestionWrapper } from '../common/QuestionWrapper';
import { useQuote } from '../../hooks/useQuote';

export const TallCabinetsQuestion: React.FC = () => {
  const { state, dispatch } = useQuote();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    dispatch({ type: 'SET_TALL_CABINETS_COUNT', payload: value });
  };

  return (
    <QuestionWrapper
      title="Tall Cabinets"
      description="How many tall cabinets (over 4 feet) will you have?"
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
          <li>Pantry cabinets (food storage)</li>
          <li>Broom/utility closets</li>
          <li>Pull-out trash cabinets</li>
          <li>Full-height storage units</li>
          <li>Oven/microwave towers</li>
        </ul>
      </div>
    </QuestionWrapper>
  );
}; 