import React, { useState } from 'react';
import { QuestionWrapper } from '../common/QuestionWrapper';
import { useQuote } from '../../hooks/useQuote';

export const IslandPeninsulaQuestion: React.FC = () => {
  const { state, dispatch } = useQuote();
  const [hasIsland, setHasIsland] = useState(state.islandLength > 0 || state.islandWidth > 0);
  const [errors, setErrors] = useState<{ length?: string; width?: string }>({});

  const handleHasIslandChange = (value: boolean) => {
    setHasIsland(value);
    if (!value) {
      // Reset island dimensions if user says no
      dispatch({ type: 'SET_ISLAND_LENGTH', payload: 0 });
      dispatch({ type: 'SET_ISLAND_WIDTH', payload: 0 });
      setErrors({});
    }
  };

  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    const newErrors = { ...errors };
    delete newErrors.length;
    
    if (event.target.value === '') {
      dispatch({ type: 'SET_ISLAND_LENGTH', payload: 0 });
      setErrors(newErrors);
      return;
    }
    
    if (isNaN(value) || value < 0) {
      newErrors.length = 'Please enter a valid positive number';
      setErrors(newErrors);
      return;
    }
    
    if (value > 50) {
      newErrors.length = 'That seems unusually long for an island/peninsula.';
      setErrors(newErrors);
      return;
    }
    
    dispatch({ type: 'SET_ISLAND_LENGTH', payload: value });
    setErrors(newErrors);
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    dispatch({ type: 'SET_ISLAND_WIDTH', payload: value });
  };

  return (
    <QuestionWrapper
      title="Island or Peninsula"
      description="Will you have an island or peninsula in your kitchen?"
      helpText="Islands are standalone units, while peninsulas are connected to existing cabinetry. Both add significant storage and workspace."
    >
      {/* Yes/No Selection */}
      <div className="form-group">
        <div className="radio-group">
          <label className={`radio-option ${hasIsland ? 'selected' : ''}`}>
            <input
              type="radio"
              name="hasIsland"
              checked={hasIsland}
              onChange={() => handleHasIslandChange(true)}
              className="radio-input"
            />
            <div className="flex-1">
              <div className="radio-label">Yes, I will have an island or peninsula</div>
              <div className="radio-description">Additional storage and prep space</div>
            </div>
          </label>
          
          <label className={`radio-option ${!hasIsland ? 'selected' : ''}`}>
            <input
              type="radio"
              name="hasIsland"
              checked={!hasIsland}
              onChange={() => handleHasIslandChange(false)}
              className="radio-input"
            />
            <div className="flex-1">
              <div className="radio-label">No island or peninsula</div>
              <div className="radio-description">Standard perimeter kitchen layout</div>
            </div>
          </label>
        </div>
      </div>

      {/* Dimensions Input (only shown if they have an island) */}
      {hasIsland && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="islandLength" className="form-label">
                Length (feet)
              </label>
              <div className="relative">
                <input
                  id="islandLength"
                  type="number"
                  min="0"
                  step="1"
                  value={state.islandLength || ''}
                  onChange={handleLengthChange}
                  className="form-control"
                  placeholder="0"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ft
                </span>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="islandWidth" className="form-label">
                Width (feet)
              </label>
              <div className="relative">
                <input
                  id="islandWidth"
                  type="number"
                  min="0"
                  step="1"
                  value={state.islandWidth || ''}
                  onChange={handleWidthChange}
                  className="form-control"
                  placeholder="0"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ft
                </span>
              </div>
            </div>
          </div>


        </div>
      )}
    </QuestionWrapper>
  );
}; 