import { createContext } from 'react';
import type { QuoteContextType } from './types';

// Create context
export const QuoteContext = createContext<QuoteContextType | undefined>(undefined); 