import React, { useState } from 'react';
import { QuestionWrapper } from '../common/QuestionWrapper';
import { useQuote } from '../../hooks/useQuote';

export const GlassDoorsQuestion: React.FC = () => {
  const { state, dispatch } = useQuote();
  const [error, setError] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setError('');
    
    if (event.target.value === '') {
      dispatch({ type: 'SET_GLASS_DOORS_COUNT', payload: 0 });
      return;
    }
    
    if (isNaN(value) || value < 0) {
      setError('Please enter a valid number (0 or greater)');
      return;
    }
    
    if (value > 50) {
      setError('That seems like a lot of glass doors. Please verify the count.');
      return;
    }
    
    dispatch({ type: 'SET_GLASS_DOORS_COUNT', payload: value });
  };

  const glassDoorCost = state.glassDoorsCount * state.pricePerFoot * 0.25;
  const mainDoorsCost = state.calculatedValues?.L || 0;
  const totalWithGlass = mainDoorsCost + glassDoorCost;

  return (
    <QuestionWrapper
      title="Glass Doors"
      description="How many doors will be glass?"
      error={error}
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
            <li>• Display china and glassware</li>
            <li>• Showcase decorative dishes</li>
            <li>• Create visual breaks in long runs</li>
            <li>• Add elegance to dining areas</li>
            <li>• Make spaces feel more open</li>
          </ul>
        </div>
        
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
          <div className="text-sm font-medium text-gray-900 mb-2">
            💡 Glass Door Tips:
          </div>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Usually in upper cabinets only</li>
            <li>• Keep contents organized/attractive</li>
            <li>• Consider frosted for less visibility</li>
            <li>• Common in corner cabinets</li>
            <li>• Great for showcasing collections</li>
          </ul>
        </div>
      </div>

      {/* Cost calculation preview */}
      {state.glassDoorsCount > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
          <div className="text-sm font-medium text-blue-900 mb-2">
            Glass Door Calculation:
          </div>
          <div className="space-y-1 text-sm text-blue-800">
            <div>
              {state.glassDoorsCount} door{state.glassDoorsCount !== 1 ? 's' : ''} × ${state.pricePerFoot}/ft × 0.25 = ${glassDoorCost.toLocaleString()}
            </div>
            <div className="text-xs text-blue-600 mt-1">
              Glass doors are calculated at 25% of the base rate due to specialized materials and installation
            </div>
          </div>
        </div>
      )}

      {/* Final calculation preview if we have data */}
      {(mainDoorsCost > 0 || glassDoorCost > 0) && (
        <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-200">
          <div className="text-sm font-medium text-green-900 mb-2">
            🎯 Final Cabinet Calculation:
          </div>
          <div className="space-y-1 text-sm text-green-800">
            <div>Main cabinet cost: ${mainDoorsCost.toLocaleString()}</div>
            {state.glassDoorsCount > 0 && (
              <div>Glass doors addition: ${glassDoorCost.toLocaleString()}</div>
            )}
            <div className="border-t border-green-300 pt-1 font-medium">
              Total project cost: ${totalWithGlass.toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </QuestionWrapper>
  );
}; 