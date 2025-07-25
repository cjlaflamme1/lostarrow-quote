import React, { useReducer, useState } from 'react';
import type { QuoteState, QuoteAction, QuoteContextType, CalculatedValues } from './types';
import { calculateQuote } from '../utils/calculations';
import { validateStep } from '../utils/validation';
import { TOTAL_STEPS } from '../constants/steps';

// Initial state with default values
const initialCalculatedValues: CalculatedValues = {
  B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, I: 0, J: 0, K: 0, L: 0, M: 0, N: 0,
  lowEstimate: 0,
  highEstimate: 0
};

const initialState: QuoteState = {
  pricePerFoot: 1000, // Internal company pricing
  baseCabinetLength: 0,
  wallCabinetLength: 0,
  wallCabinetHeight: 'h30',
  tallCabinetsCount: 0,
  islandLength: 0,
  islandWidth: 0,
  cabinetFinish: 'painted',
  panelType: 'raised',
  doorProfile: 'shaker',
  glassDoorsCount: 0,
  calculatedValues: initialCalculatedValues
};

// Reducer function
const quoteReducer = (state: QuoteState, action: QuoteAction): QuoteState => {
  let newState: QuoteState;
  
  switch (action.type) {
    case 'SET_PRICE_PER_FOOT':
      newState = { ...state, pricePerFoot: action.payload };
      break;
    case 'SET_BASE_CABINET_LENGTH':
      newState = { ...state, baseCabinetLength: action.payload };
      break;
    case 'SET_WALL_CABINET_LENGTH':
      newState = { ...state, wallCabinetLength: action.payload };
      break;
    case 'SET_WALL_CABINET_HEIGHT':
      newState = { ...state, wallCabinetHeight: action.payload };
      break;
    case 'SET_TALL_CABINETS_COUNT':
      newState = { ...state, tallCabinetsCount: action.payload };
      break;
    case 'SET_ISLAND_LENGTH':
      newState = { ...state, islandLength: action.payload };
      break;
    case 'SET_ISLAND_WIDTH':
      newState = { ...state, islandWidth: action.payload };
      break;
    case 'SET_CABINET_FINISH':
      newState = { ...state, cabinetFinish: action.payload };
      break;
    case 'SET_PANEL_TYPE':
      newState = { ...state, panelType: action.payload };
      break;
    case 'SET_DOOR_PROFILE':
      newState = { ...state, doorProfile: action.payload };
      break;
    case 'SET_GLASS_DOORS_COUNT':
      newState = { ...state, glassDoorsCount: action.payload };
      break;
    case 'CALCULATE_QUOTE':
      newState = state;
      break;
    default:
      return state;
  }
  
  // Always recalculate when state changes
  newState.calculatedValues = calculateQuote(newState);
  return newState;
};

import { QuoteContext } from './quote-context';

// Provider component
export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(quoteReducer, initialState);
  const [currentStep, setCurrentStep] = useState(0);

  const canGoNext = (): boolean => {
    if (currentStep >= TOTAL_STEPS - 1) return false;
    return validateStep(currentStep, state);
  };

  const canGoBack = (): boolean => {
    return currentStep > 0;
  };

  const goNext = (): void => {
    if (canGoNext()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goBack = (): void => {
    if (canGoBack()) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const value: QuoteContextType = {
    state,
    dispatch,
    currentStep,
    setCurrentStep,
    canGoNext,
    canGoBack,
    goNext,
    goBack
  };

  return (
    <QuoteContext.Provider value={value}>
      {children}
    </QuoteContext.Provider>
  );
};

 