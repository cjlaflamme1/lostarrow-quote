import React from 'react';
import { QuoteProvider } from './context/QuoteContext';
import { Layout } from './components/common/Layout';
import { NavigationButtons } from './components/common/NavigationButtons';
import { BaseCabinetLengthQuestion } from './components/questions/BaseCabinetLengthQuestion';
import { WallCabinetLengthQuestion } from './components/questions/WallCabinetLengthQuestion';
import { WallCabinetHeightQuestion } from './components/questions/WallCabinetHeightQuestion';
import { TallCabinetsQuestion } from './components/questions/TallCabinetsQuestion';
import { IslandPeninsulaQuestion } from './components/questions/IslandPeninsulaQuestion';
import { CabinetFinishQuestion } from './components/questions/CabinetFinishQuestion';
import { PanelTypeQuestion } from './components/questions/PanelTypeQuestion';
import { DoorProfileQuestion } from './components/questions/DoorProfileQuestion';
import { GlassDoorsQuestion } from './components/questions/GlassDoorsQuestion';
import { QuoteResults } from './components/results/QuoteResults';
import { useQuote } from './hooks/useQuote';
import './styles/globals.css';
import './styles/components.css';

const QuoteApp: React.FC = () => {
  const { currentStep } = useQuote();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <BaseCabinetLengthQuestion />;
      case 1:
        return <WallCabinetLengthQuestion />;
      case 2:
        return <WallCabinetHeightQuestion />;
      case 3:
        return <TallCabinetsQuestion />;
      case 4:
        return <IslandPeninsulaQuestion />;
      case 5:
        return <CabinetFinishQuestion />;
      case 6:
        return <PanelTypeQuestion />;
      case 7:
        return <DoorProfileQuestion />;
      case 8:
        return <GlassDoorsQuestion />;
      case 9:
        return <QuoteResults />;
      default:
        return (
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold mb-4">All Done! 🎉</h2>
            <p className="text-secondary">
              You've completed all the steps. Your quote is ready!
            </p>
            <div className="mt-4">
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                Start New Quote
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {renderCurrentStep()}
        <NavigationButtons />
      </div>
    </Layout>
  );
};

function App() {
  return (
    <QuoteProvider>
      <QuoteApp />
    </QuoteProvider>
  );
}

export default App;
