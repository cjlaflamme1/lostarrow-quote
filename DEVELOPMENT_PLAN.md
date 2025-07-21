# Cabinet Quote App Development Plan

## Project Overview
Building a mobile-first React TypeScript application for generating kitchen cabinet installation estimates. The app will guide users through a step-by-step questionnaire and calculate quote ranges based on the provided algorithm.

## 1. Technical Architecture

### Tech Stack
- **Framework**: React 18 with TypeScript (already set up)
- **Build Tool**: Vite (already configured)
- **Styling**: CSS Modules + CSS Custom Properties (minimal dependencies)
- **State Management**: React Context API + useReducer (no external dependencies)
- **Form Handling**: Native HTML forms with React state
- **Navigation**: Custom component-based navigation

### Project Structure
```
src/
├── components/
│   ├── common/
│   │   ├── Layout.tsx
│   │   ├── NavigationButtons.tsx
│   │   ├── ProgressBar.tsx
│   │   └── QuestionWrapper.tsx
│   ├── questions/
│   │   ├── PricePerFootQuestion.tsx
│   │   ├── BaseCabinetLengthQuestion.tsx
│   │   ├── WallCabinetLengthQuestion.tsx
│   │   ├── WallCabinetHeightQuestion.tsx
│   │   ├── TallCabinetsQuestion.tsx
│   │   ├── IslandPeninsulaQuestion.tsx
│   │   ├── CabinetFinishQuestion.tsx
│   │   ├── DoorTypeQuestion.tsx
│   │   ├── PanelTypeQuestion.tsx
│   │   ├── DoorProfileQuestion.tsx
│   │   └── GlassDoorsQuestion.tsx
│   └── results/
│       ├── QuoteResults.tsx
│       └── HiddenFormSubmission.tsx
├── context/
│   ├── QuoteContext.tsx
│   └── types.ts
├── hooks/
│   ├── useQuoteCalculation.ts
│   └── useNavigation.ts
├── utils/
│   ├── calculations.ts
│   └── validation.ts
├── styles/
│   ├── globals.css
│   ├── components.css
│   └── mobile.css
└── constants/
    └── steps.ts
```

## 2. Data Flow & State Management

### Quote State Interface
```typescript
interface QuoteState {
  // Input values
  pricePerFoot: number;
  baseCabinetLength: number;
  wallCabinetLength: number;
  wallCabinetHeight: 'h30' | 'h36' | 'h40' | 'h42plus';
  tallCabinetsCount: number;
  islandLength: number;
  islandWidth: number;
  cabinetFinish: 'painted' | 'clear-stain';
  doorType: 'solid-slab' | 'center-panel';
  panelType: 'raised' | 'flat';
  doorProfile: 'shaker' | 'profile' | 'skinny-shaker';
  glassDoorsCount: number;
  
  // Calculated values (for transparency)
  calculatedValues: {
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
  };
}
```

### Navigation State
```typescript
interface NavigationState {
  currentStep: number;
  totalSteps: number;
  canGoBack: boolean;
  canGoNext: boolean;
  isComplete: boolean;
}
```

## 3. Component Breakdown

### 3.1 Common Components

#### Layout.tsx
- Main app container with mobile-first responsive design
- Progress indicator
- Header with step information

#### QuestionWrapper.tsx
- Reusable wrapper for all question components
- Consistent styling and spacing
- Question title and description

#### NavigationButtons.tsx
- Back/Next button pair
- Conditional rendering based on step
- Disabled states for validation

#### ProgressBar.tsx
- Visual progress indicator
- Step number display
- Completion percentage

### 3.2 Question Components

Each question component will:
- Accept current value and onChange handler via props
- Include validation logic
- Provide clear labels and help text
- Be fully accessible (ARIA labels, keyboard navigation)

#### PricePerFootQuestion.tsx
- Number input for price per lineal foot
- Input validation (positive numbers only)
- Currency formatting display

#### BaseCabinetLengthQuestion.tsx
- Number input for wall length
- Help text about measuring to nearest foot
- Visual representation if helpful

#### WallCabinetLengthQuestion.tsx
- Similar to base cabinet length
- Different help text specific to wall cabinets

#### WallCabinetHeightQuestion.tsx
- Radio button group for height options
- Clear visual representation of height differences
- Multiplier explanation

#### TallCabinetsQuestion.tsx
- Number input for count
- Help text about pantry cabinets
- Examples of what qualifies as "tall"

#### IslandPeninsulaQuestion.tsx
- Conditional logic (yes/no first, then dimensions)
- Two number inputs for length and width
- Width logic explanation (<3 = 1, >3 = 2)

#### CabinetFinishQuestion.tsx
- Radio button group (painted vs clear/stain)
- Visual examples if possible
- Price impact explanation

#### DoorTypeQuestion.tsx
- Radio button group (solid slab vs center panel)
- Visual examples
- Price impact indication

#### PanelTypeQuestion.tsx
- Conditional on center panel selection
- Radio button group (raised vs flat)
- Visual examples

#### DoorProfileQuestion.tsx
- Radio button group for three options
- Visual examples of each profile type
- Price impact indicators

#### GlassDoorsQuestion.tsx
- Number input for glass door count
- Help text about glass door options
- Visual examples

### 3.3 Results Components

#### QuoteResults.tsx
- Display price range prominently
- Breakdown of calculation steps
- Professional presentation
- Call-to-action for form submission

#### HiddenFormSubmission.tsx
- Hidden form with all user inputs
- Submit button integration
- Form validation before submission
- Success/error handling

## 4. Calculation Logic

### utils/calculations.ts
Implement the algorithm step by step:

```typescript
export const calculateQuote = (state: QuoteState): CalculatedValues => {
  const A = state.pricePerFoot;
  
  // Base cabinets
  const B = state.baseCabinetLength * A;
  
  // Wall cabinets
  const C = state.wallCabinetLength * A;
  const heightMultiplier = getHeightMultiplier(state.wallCabinetHeight);
  const D = C * heightMultiplier;
  
  // Tall cabinets
  const E = state.tallCabinetsCount * A * 6;
  
  // Island/Peninsula
  const F = state.islandLength * A;
  const widthMultiplier = state.islandWidth < 3 ? 1 : 2;
  const G = widthMultiplier * F;
  
  // Subtotal
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
  
  // Glass doors
  const M = state.glassDoorsCount * A * 0.25;
  
  // Final calculation
  const N = L + M;
  
  return {
    B, C, D, E, F, G, H, I, J, K, L, M, N,
    lowEstimate: N * 0.9,
    highEstimate: N * 1.15
  };
};
```

## 5. Navigation System

### Custom Navigation Hook
```typescript
const useNavigation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const goNext = () => {
    if (canGoNext()) setCurrentStep(prev => prev + 1);
  };
  
  const goBack = () => {
    if (canGoBack()) setCurrentStep(prev => prev - 1);
  };
  
  const canGoNext = () => {
    // Validation logic for current step
    return validateCurrentStep();
  };
  
  const canGoBack = () => {
    return currentStep > 0;
  };
  
  return { currentStep, goNext, goBack, canGoNext, canGoBack };
};
```

## 6. Mobile-First Design Strategy

### CSS Custom Properties
```css
:root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --success-color: #27ae60;
  --warning-color: #f39c12;
  --error-color: #e74c3c;
  
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
}
```

### Responsive Breakpoints
- Mobile: 320px - 768px (primary target)
- Tablet: 768px - 1024px
- Desktop: 1024px+

### Key Design Principles
- Touch-friendly button sizes (min 44px)
- Clear visual hierarchy
- Readable typography
- Sufficient contrast ratios
- Loading states and feedback

## 7. Implementation Phases

### Phase 1: Foundation (Day 1)
- [ ] Set up project structure
- [ ] Create basic types and interfaces
- [ ] Implement QuoteContext and state management
- [ ] Create Layout and QuestionWrapper components
- [ ] Set up basic navigation system

### Phase 2: Core Questions (Day 2)
- [ ] Implement first 6 question components
- [ ] Add validation logic
- [ ] Create NavigationButtons component
- [ ] Implement ProgressBar
- [ ] Test navigation flow

### Phase 3: Advanced Questions (Day 3)
- [ ] Implement remaining question components
- [ ] Add conditional logic (panel type, island dimensions)
- [ ] Implement calculation engine
- [ ] Add calculation transparency

### Phase 4: Results & Submission (Day 4)
- [ ] Create QuoteResults component
- [ ] Implement HiddenFormSubmission
- [ ] Add form validation and submission
- [ ] Create success/error states

### Phase 5: Polish & Testing (Day 5)
- [ ] Mobile responsiveness testing
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Error handling improvements
- [ ] User experience testing

## 8. Quality Assurance

### Testing Strategy
- Manual testing on multiple devices
- Accessibility testing with screen readers
- Form validation testing
- Calculation accuracy verification
- Edge case testing

### Performance Considerations
- Lazy loading for question components
- Optimized re-renders with React.memo
- Efficient state updates
- Minimal bundle size

### Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management

## 9. Future Enhancements

### Phase 2 Features (Future)
- Save progress functionality
- Email quote delivery
- PDF generation
- Admin dashboard for price adjustments
- Analytics and usage tracking
- Multiple quote comparison

### Technical Improvements
- Add unit tests
- Implement E2E testing
- Add error boundary components
- Implement offline functionality
- Add Progressive Web App features

---

This plan provides a comprehensive roadmap for building a maintainable, user-friendly cabinet quote application with minimal dependencies and excellent mobile experience. 