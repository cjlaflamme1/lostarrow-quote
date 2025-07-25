export interface CalculatedValues {
  B: number; // Base cabinet cost
  C: number; // Wall cabinet base cost
  D: number; // Wall cabinet adjusted cost
  E: number; // Tall cabinet cost
  F: number; // Island length cost
  G: number; // Island total cost
  H: number; // Subtotal
  I: number; // After finish multiplier
  J: number; // After door type multiplier
  K: number; // After panel type multiplier
  L: number; // After profile multiplier
  M: number; // Glass doors cost
  N: number; // Final base cost
  lowEstimate: number;
  highEstimate: number;
}

export interface QuoteState {
  // Input values
  pricePerFoot: number;
  baseCabinetLength: number;
  wallCabinetLength: number;
  wallCabinetHeight: 'h30' | 'h36' | 'h40' | 'h42plus';
  tallCabinetsCount: number;
  islandLength: number;
  islandWidth: number;
  cabinetFinish: 'painted' | 'clear-stain';
  panelType: 'raised' | 'flat';
  doorProfile: 'shaker' | 'profile' | 'skinny-shaker';
  glassDoorsCount: number;
  
  // Calculated values (for transparency)
  calculatedValues: CalculatedValues;
}

export interface NavigationState {
  currentStep: number;
  totalSteps: number;
  canGoBack: boolean;
  canGoNext: boolean;
  isComplete: boolean;
}

export type QuoteAction = 
  | { type: 'SET_PRICE_PER_FOOT'; payload: number }
  | { type: 'SET_BASE_CABINET_LENGTH'; payload: number }
  | { type: 'SET_WALL_CABINET_LENGTH'; payload: number }
  | { type: 'SET_WALL_CABINET_HEIGHT'; payload: QuoteState['wallCabinetHeight'] }
  | { type: 'SET_TALL_CABINETS_COUNT'; payload: number }
  | { type: 'SET_ISLAND_LENGTH'; payload: number }
  | { type: 'SET_ISLAND_WIDTH'; payload: number }
  | { type: 'SET_CABINET_FINISH'; payload: QuoteState['cabinetFinish'] }
  | { type: 'SET_PANEL_TYPE'; payload: QuoteState['panelType'] }
  | { type: 'SET_DOOR_PROFILE'; payload: QuoteState['doorProfile'] }
  | { type: 'SET_GLASS_DOORS_COUNT'; payload: number }
  | { type: 'CALCULATE_QUOTE' };

export interface QuoteContextType {
  state: QuoteState;
  dispatch: React.Dispatch<QuoteAction>;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  canGoNext: () => boolean;
  canGoBack: () => boolean;
  goNext: () => void;
  goBack: () => void;
} 