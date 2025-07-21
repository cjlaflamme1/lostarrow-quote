import type { QuoteState, CalculatedValues } from '../context/types';

export const getHeightMultiplier = (height: QuoteState['wallCabinetHeight']): number => {
  switch (height) {
    case 'h30': return 1;
    case 'h36': return 1.25;
    case 'h40': return 1.5;
    case 'h42plus': return 2;
    default: return 1;
  }
};

export const getProfileMultiplier = (profile: QuoteState['doorProfile']): number => {
  switch (profile) {
    case 'shaker': return 1;
    case 'profile': return 1.1;
    case 'skinny-shaker': return 1.15;
    default: return 1;
  }
};

export const calculateQuote = (state: QuoteState): CalculatedValues => {
  const A = state.pricePerFoot;
  
  // Base cabinets (Length x A = B)
  const B = state.baseCabinetLength * A;
  
  // Wall cabinets (Length x A = C)
  const C = state.wallCabinetLength * A;
  
  // Wall cabinet height adjustment
  const heightMultiplier = getHeightMultiplier(state.wallCabinetHeight);
  const D = C * heightMultiplier;
  
  // Tall cabinets (Number x A x 6 = E)
  const E = state.tallCabinetsCount * A * 6;
  
  // Island/Peninsula calculations
  const F = state.islandLength * A; // Length x A = F
  
  // Width logic: If width <3, width = 1; If width >3, width = 2
  const widthMultiplier = state.islandWidth < 3 ? 1 : 2;
  const G = widthMultiplier * F; // Width x F = G
  
  // Subtotal (B + D + E + G = H)
  const H = B + D + E + G;
  
  // Apply finish multiplier
  const finishMultiplier = state.cabinetFinish === 'painted' ? 1.1 : 1;
  const I = H * finishMultiplier;
  
  // Apply door type multiplier
  const doorMultiplier = state.doorType === 'center-panel' ? 1.1 : 1;
  const J = I * doorMultiplier;
  
  // Apply panel type multiplier (only if center panel)
  const panelMultiplier = 
    state.doorType === 'center-panel' && state.panelType === 'raised' ? 1.05 : 1;
  const K = J * panelMultiplier;
  
  // Apply profile multiplier
  const profileMultiplier = getProfileMultiplier(state.doorProfile);
  const L = K * profileMultiplier;
  
  // Glass doors (Number x A x 0.25 = M)
  const M = state.glassDoorsCount * A * 0.25;
  
  // Final calculation (L + M = N)
  const N = L + M;
  
  return {
    B: Math.round(B * 100) / 100,
    C: Math.round(C * 100) / 100,
    D: Math.round(D * 100) / 100,
    E: Math.round(E * 100) / 100,
    F: Math.round(F * 100) / 100,
    G: Math.round(G * 100) / 100,
    H: Math.round(H * 100) / 100,
    I: Math.round(I * 100) / 100,
    J: Math.round(J * 100) / 100,
    K: Math.round(K * 100) / 100,
    L: Math.round(L * 100) / 100,
    M: Math.round(M * 100) / 100,
    N: Math.round(N * 100) / 100,
    lowEstimate: Math.round(N * 0.9 * 100) / 100,
    highEstimate: Math.round(N * 1.15 * 100) / 100
  };
}; 