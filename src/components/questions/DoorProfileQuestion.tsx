import React from 'react';
import { QuestionWrapper } from '../common/QuestionWrapper';
import { useQuote } from '../../hooks/useQuote';

const PROFILE_OPTIONS = [
  { 
    value: 'shaker' as const, 
    label: 'Shaker Style', 
    multiplier: 1,
    description: 'Clean, simple profile - the most popular choice',
    details: 'Straight lines, minimal ornamentation, timeless appeal'
  },
  { 
    value: 'profile' as const, 
    label: 'Profile', 
    multiplier: 1.1,
    description: 'Decorative edge profile - adds elegant detail',
    details: 'Routed edges, additional milling, more sophisticated look'
  },
  { 
    value: 'skinny-shaker' as const, 
    label: 'Skinny Shaker', 
    multiplier: 1.15,
    description: 'Narrow frame Shaker - modern, sleek appearance',
    details: 'Thinner frame rails, contemporary style, precise craftsmanship'
  }
];

export const DoorProfileQuestion: React.FC = () => {
  const { state, dispatch } = useQuote();

  const handleChange = (value: typeof state.doorProfile) => {
    dispatch({ type: 'SET_DOOR_PROFILE', payload: value });
  };

  return (
    <QuestionWrapper
      title="Door Profile"
      description="What profile will be on the door?"
      helpText="The door profile affects the edge treatment and overall style. This is the final detail that defines your cabinet's character."
    >
      <div className="radio-group">
        {PROFILE_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`radio-option ${state.doorProfile === option.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name="doorProfile"
              value={option.value}
              checked={state.doorProfile === option.value}
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
              <div className="text-xs text-gray-600 mt-1">
                {option.details}
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Style guide */}
      <div className="mt-4 grid grid-cols-1 gap-4">
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
          <div className="text-sm font-medium text-gray-900 mb-2">🎨 Profile Style Guide:</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-700">
            <div>
              <div className="font-medium mb-1">Shaker (Standard)</div>
              <div className="text-xs">Most popular, works with any décor, clean lines</div>
            </div>
            <div>
              <div className="font-medium mb-1">Profile (Detailed)</div>
              <div className="text-xs">Decorative edges, traditional feel, elegant</div>
            </div>
            <div>
              <div className="font-medium mb-1">Skinny Shaker (Modern)</div>
              <div className="text-xs">Thin frames, contemporary, sleek appearance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation based on previous choices */}
      <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-200">
        <div className="text-sm font-medium text-green-900 mb-1">
          💡 Recommendation based on your choices:
        </div>
        <div className="text-sm text-green-800">
          {state.panelType === 'raised' 
            ? "Raised panels pair excellently with Profile edges for a traditional, formal appearance."
            : "Flat panels look great with any profile - Shaker for timeless appeal, Skinny Shaker for modern style."
          }
        </div>
      </div>
    </QuestionWrapper>
  );
}; 