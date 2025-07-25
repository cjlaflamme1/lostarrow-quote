import React from 'react';
import { QuestionWrapper } from '../common/QuestionWrapper';
import { useQuote } from '../../hooks/useQuote';

export const GlassDoorsQuestion: React.FC = () => {
  const { state, dispatch } = useQuote();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    dispatch({ type: 'SET_GLASS_DOORS_COUNT', payload: value });
  };

  return (
    <QuestionWrapper
      title="Glass Doors"
      description="How many doors will be glass?"
      helpText="Glass doors showcase dishes and decorative items while adding visual interest. They're typically used in upper cabinets. Enter 0 if you won't have any glass doors."
    >
      <div className="form-group">
        <label htmlFor="glassDoorsCount" className="form-label">
          Number of glass doors
        </label>
        <div className="relative">
          <input
            id="glassDoorsCount"
            type="number"
            min="0"
            step="1"
            value={state.glassDoorsCount || ''}
            onChange={handleChange}
            className="form-control"
            placeholder="0"
            aria-describedby="glassDoorsCount-help"
            autoFocus
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            doors
          </span>
        </div>
        <div id="glassDoorsCount-help" className="text-sm text-secondary mt-2">
          Glass doors cost 25% of the base price per linear foot (${(state.pricePerFoot * 0.25).toLocaleString()} each)
        </div>
      </div>

      {/* Examples and guidance */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
          <div className="text-sm font-medium text-gray-900 mb-2">
            🪟 Popular Glass Door Uses:
          </div>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>Display china and glassware</li>
            <li>Showcase decorative dishes</li>
            <li>Create visual breaks in long runs</li>
            <li>Add elegance to dining areas</li>
            <li>Make spaces feel more open</li>
          </ul>
        </div>
        
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
          <div className="text-sm font-medium text-gray-900 mb-2">
            💡 Glass Door Tips:
          </div>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>Usually in upper cabinets only</li>
            <li>Keep contents organized/attractive</li>
            <li>Consider frosted for less visibility</li>
            <li>Common in corner cabinets</li>
            <li>Great for showcasing collections</li>
          </ul>
        </div>
      </div>
    </QuestionWrapper>
  );
}; 