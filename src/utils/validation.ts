import type { QuoteState } from '../context/types';

export const validatePositiveNumber = (value: number): boolean => {
  return !isNaN(value) && value > 0;
};

export const validateStep = (step: number, state: QuoteState): boolean => {
  switch (step) {
    case 0: // Base cabinet length
      return validatePositiveNumber(state.baseCabinetLength);
    
    case 1: // Wall cabinet length
      return validatePositiveNumber(state.wallCabinetLength);
    
    case 2: // Wall cabinet height
      return ['h30', 'h36', 'h40', 'h42plus'].includes(state.wallCabinetHeight);
    
    case 3: // Tall cabinets
      return state.tallCabinetsCount >= 0; // Can be 0
    
    case 4: // Island/Peninsula
      return state.islandLength >= 0 && state.islandWidth >= 0; // Can be 0 if no island
    
    case 5: // Cabinet finish
      return ['painted', 'clear-stain'].includes(state.cabinetFinish);
    
    case 6: // Panel type
      return ['raised', 'flat'].includes(state.panelType);
    
    case 7: // Door profile
      return ['shaker', 'profile', 'skinny-shaker'].includes(state.doorProfile);
    
    case 8: // Glass doors
      return state.glassDoorsCount >= 0; // Can be 0
    
    default:
      return true;
  }
}; 