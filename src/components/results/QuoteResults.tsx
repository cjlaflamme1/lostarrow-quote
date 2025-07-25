import React, { useState } from 'react';
import { useQuote } from '../../hooks/useQuote';
import { HiddenFormSubmission } from './HiddenFormSubmission';

export const QuoteResults: React.FC = () => {
  const { state } = useQuote();
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const calc = state.calculatedValues;
  const lowEstimate = calc.lowEstimate;
  const highEstimate = calc.highEstimate;
  const averageEstimate = (lowEstimate + highEstimate) / 2;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Main Quote Display */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Your Cabinet Quote
        </h2>
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border-2 border-blue-200">
          <div className="text-4xl font-bold text-primary mb-2">
            {formatCurrency(lowEstimate)} - {formatCurrency(highEstimate)}
          </div>
          <div className="text-lg text-secondary mb-3">
            Average: {formatCurrency(averageEstimate)}
          </div>
          <div className="text-sm text-gray-600">
            Quote based on {state.pricePerFoot}/ft base rate
          </div>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-sm font-medium text-gray-500 mb-1">Base Cabinets</div>
          <div className="text-lg font-semibold">{state.baseCabinetLength} ft</div>
          <div className="text-xs text-gray-500">{formatCurrency(calc.B)}</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-sm font-medium text-gray-500 mb-1">Wall Cabinets</div>
          <div className="text-lg font-semibold">{state.wallCabinetLength} ft</div>
          <div className="text-xs text-gray-500">{formatCurrency(calc.D)}</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-sm font-medium text-gray-500 mb-1">Special Features</div>
          <div className="text-lg font-semibold">
            {state.tallCabinetsCount + state.glassDoorsCount + (state.islandLength > 0 ? 1 : 0)} items
          </div>
          <div className="text-xs text-gray-500">
            {formatCurrency(calc.E + calc.G + calc.M)}
          </div>
        </div>
      </div>

      {/* Breakdown Toggle */}
      <div className="text-center">
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="btn btn-secondary"
        >
          {showBreakdown ? 'Hide' : 'Show'} Detailed Breakdown
        </button>
      </div>

      {/* Detailed Breakdown */}
      {showBreakdown && (
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-4">Calculation Breakdown</h3>
          
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>A. Price per foot:</div>
              <div className="font-medium">{formatCurrency(state.pricePerFoot)}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>B. Base cabinets ({state.baseCabinetLength} ft × A):</div>
              <div className="font-medium">{formatCurrency(calc.B)}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>C. Wall cabinets base ({state.wallCabinetLength} ft × A):</div>
              <div className="font-medium">{formatCurrency(calc.C)}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>D. Wall cabinets adjusted (C × height multiplier):</div>
              <div className="font-medium">{formatCurrency(calc.D)}</div>
            </div>
            
            {state.tallCabinetsCount > 0 && (
              <div className="grid grid-cols-2 gap-4">
                <div>E. Tall cabinets ({state.tallCabinetsCount} × A × 6):</div>
                <div className="font-medium">{formatCurrency(calc.E)}</div>
              </div>
            )}
            
            {state.islandLength > 0 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>F. Island length ({state.islandLength} ft × A):</div>
                  <div className="font-medium">{formatCurrency(calc.F)}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>G. Island total (F × width multiplier):</div>
                  <div className="font-medium">{formatCurrency(calc.G)}</div>
                </div>
              </>
            )}
            
            <div className="border-t pt-3 grid grid-cols-2 gap-4 font-medium">
              <div>H. Subtotal (B + D + E + G):</div>
              <div>{formatCurrency(calc.H)}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>I. After finish ({state.cabinetFinish}):</div>
              <div className="font-medium">{formatCurrency(calc.I)}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>J. After panel type ({state.panelType}):</div>
              <div className="font-medium">{formatCurrency(calc.J)}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>L. After profile ({state.doorProfile}):</div>
              <div className="font-medium">{formatCurrency(calc.L)}</div>
            </div>
            
            {state.glassDoorsCount > 0 && (
              <div className="grid grid-cols-2 gap-4">
                <div>M. Glass doors ({state.glassDoorsCount} × A × 0.25):</div>
                <div className="font-medium">{formatCurrency(calc.M)}</div>
              </div>
            )}
            
            <div className="border-t pt-3 grid grid-cols-2 gap-4 font-bold text-lg">
              <div>N. Total (L + M):</div>
              <div>{formatCurrency(calc.N)}</div>
            </div>
            
            <div className="border-t pt-3">
              <div className="grid grid-cols-2 gap-4 text-green-700">
                <div>Low estimate (90%):</div>
                <div className="font-bold">{formatCurrency(lowEstimate)}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-blue-700">
                <div>High estimate (115%):</div>
                <div className="font-bold">{formatCurrency(highEstimate)}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Important Notes */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-900 mb-2">Important Notes:</h4>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>Actual price will vary</li>
          <li>Delivery and installation not included</li>
        </ul>
      </div>

      {/* Next Steps */}
      <div className="text-center space-y-4">
        <h4 className="text-lg font-semibold">Ready to move forward?</h4>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary btn-lg"
          >
            Request Detailed Quote
          </button>
          <button
            onClick={() => window.print()}
            className="btn btn-secondary btn-lg"
          >
            Print Quote
          </button>
        </div>
      </div>

      {/* Hidden Form */}
      {showForm && (
        <HiddenFormSubmission onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}; 