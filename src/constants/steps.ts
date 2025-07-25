export interface StepConfig {
  id: string;
  title: string;
  description: string;
  required: boolean;
}

export const STEPS: StepConfig[] = [
  {
    id: 'base-cabinet-length',
    title: 'Base Cabinet Length',
    description: 'Total length of wall for base cabinets',
    required: true
  },
  {
    id: 'wall-cabinet-length',
    title: 'Wall Cabinet Length',
    description: 'Total length of wall for wall cabinets',
    required: true
  },
  {
    id: 'wall-cabinet-height',
    title: 'Wall Cabinet Height',
    description: 'How tall will the wall cabinets be?',
    required: true
  },
  {
    id: 'tall-cabinets',
    title: 'Tall Cabinets',
    description: 'Number of tall cabinets (pantry, etc.)',
    required: true
  },
  {
    id: 'island-peninsula',
    title: 'Island/Peninsula',
    description: 'Size of island or peninsula',
    required: true
  },
  {
    id: 'cabinet-finish',
    title: 'Cabinet Finish',
    description: 'Painted or clear/stain finish',
    required: true
  },
  {
    id: 'panel-type',
    title: 'Panel Type',
    description: 'Raised or flat center panel',
    required: true
  },
  {
    id: 'door-profile',
    title: 'Door Profile',
    description: 'Style of door profile',
    required: true
  },
  {
    id: 'glass-doors',
    title: 'Glass Doors',
    description: 'Number of glass cabinet doors',
    required: true
  },
  {
    id: 'quote-results',
    title: 'Quote Results',
    description: 'Your estimated quote range',
    required: false
  }
];

export const TOTAL_STEPS = STEPS.length; 