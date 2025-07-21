import { useContext } from 'react';
import type { QuoteContextType } from '../context/types';
import { QuoteContext } from '../context/quote-context';

// Custom hook to use the context
export const useQuote = (): QuoteContextType => {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
}; 