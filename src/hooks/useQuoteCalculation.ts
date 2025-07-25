import { useMemo } from 'react';
import type { QuoteState, CalculatedValues } from '../context/types';
import { calculateQuote } from '../utils/calculations';

export const useQuoteCalculation = (state: QuoteState): CalculatedValues => {
  return useMemo(() => calculateQuote(state), [
    state.pricePerFoot,
    state.baseCabinetLength,
    state.wallCabinetLength,
    state.wallCabinetHeight,
    state.tallCabinetsCount,
    state.islandLength,
    state.islandWidth,
    state.cabinetFinish,
    state.panelType,
    state.doorProfile,
    state.glassDoorsCount
  ]);
}; 