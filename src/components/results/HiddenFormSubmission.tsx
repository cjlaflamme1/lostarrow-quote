import React, { useState } from 'react';
import { useQuote } from '../../hooks/useQuote';

interface HiddenFormSubmissionProps {
  onClose: () => void;
}

export const HiddenFormSubmission: React.FC<HiddenFormSubmissionProps> = ({ onClose }) => {
  const { state } = useQuote();
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    preferredContact: 'email' as 'email' | 'phone',
    additionalNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create comprehensive form data with all quote information
    const submitData = {
      // Customer information
      ...formData,
      
      // Quote details
      quoteId: `QUOTE-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      
      // Cabinet specifications
      baseCabinetLength: state.baseCabinetLength,
      wallCabinetLength: state.wallCabinetLength,
      wallCabinetHeight: state.wallCabinetHeight,
      tallCabinetsCount: state.tallCabinetsCount,
      islandLength: state.islandLength,
      islandWidth: state.islandWidth,
      cabinetFinish: state.cabinetFinish,
      panelType: state.panelType,
      doorProfile: state.doorProfile,
      glassDoorsCount: state.glassDoorsCount,
      
      // Pricing breakdown
      pricePerFoot: state.pricePerFoot,
      calculatedValues: state.calculatedValues,
      
      // Final estimates
      lowEstimate: state.calculatedValues.lowEstimate,
      highEstimate: state.calculatedValues.highEstimate,
      averageEstimate: (state.calculatedValues.lowEstimate + state.calculatedValues.highEstimate) / 2
    };

    // Simulate form submission (replace with actual API call)
    try {
      console.log('Submitting quote request:', submitData);
      
      // Here you would typically send to your backend
      // await fetch('/api/quotes', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(submitData)
      // });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('There was an error submitting your quote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="text-center">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h3 className="text-xl font-semibold mb-2">Quote Request Submitted!</h3>
            <p className="text-gray-600 mb-4">
              Thank you for your interest! We'll contact you within 24 hours to schedule a consultation and provide a detailed quote.
            </p>
            <button
              onClick={onClose}
              className="btn btn-primary w-full"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Request Detailed Quote</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Quote Summary */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold mb-2">Your Quote Summary:</h4>
          <div className="text-sm space-y-1">
            <div>Base Cabinets: {state.baseCabinetLength} ft</div>
            <div>Wall Cabinets: {state.wallCabinetLength} ft ({state.wallCabinetHeight})</div>
            {state.tallCabinetsCount > 0 && <div>Tall Cabinets: {state.tallCabinetsCount}</div>}
            {state.islandLength > 0 && <div>Island: {state.islandLength} × {state.islandWidth} ft</div>}
            <div>Finish: {state.cabinetFinish}, Panel: {state.panelType}</div>
            {state.glassDoorsCount > 0 && <div>Glass Doors: {state.glassDoorsCount}</div>}
            <div className="font-semibold text-blue-700 mt-2">
              Estimated Range: {formatCurrency(state.calculatedValues.lowEstimate)} - {formatCurrency(state.calculatedValues.highEstimate)}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="customerName" className="form-label">
                Full Name *
              </label>
              <input
                id="customerName"
                name="customerName"
                type="text"
                required
                value={formData.customerName}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="form-control"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="form-control"
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="form-group">
              <label htmlFor="preferredContact" className="form-label">
                Preferred Contact Method
              </label>
              <select
                id="preferredContact"
                name="preferredContact"
                value={formData.preferredContact}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Project Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleInputChange}
              className="form-control"
              placeholder="123 Main St, City, State, ZIP"
            />
          </div>

          <div className="form-group">
            <label htmlFor="additionalNotes" className="form-label">
              Additional Notes or Questions
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              className="form-control"
              rows={4}
              placeholder="Any specific requirements, timeline, or questions..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary flex-1"
            >
              {isSubmitting ? (
                <>
                  <span className="spinner" />
                  Submitting...
                </>
              ) : (
                'Submit Quote Request'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Hidden form fields with all quote data */}
        <div style={{ display: 'none' }}>
          <input type="hidden" name="baseCabinetLength" value={state.baseCabinetLength} />
          <input type="hidden" name="wallCabinetLength" value={state.wallCabinetLength} />
          <input type="hidden" name="wallCabinetHeight" value={state.wallCabinetHeight} />
          <input type="hidden" name="tallCabinetsCount" value={state.tallCabinetsCount} />
          <input type="hidden" name="islandLength" value={state.islandLength} />
          <input type="hidden" name="islandWidth" value={state.islandWidth} />
          <input type="hidden" name="cabinetFinish" value={state.cabinetFinish} />
          <input type="hidden" name="panelType" value={state.panelType} />
          <input type="hidden" name="doorProfile" value={state.doorProfile} />
          <input type="hidden" name="glassDoorsCount" value={state.glassDoorsCount} />
          <input type="hidden" name="lowEstimate" value={state.calculatedValues.lowEstimate} />
          <input type="hidden" name="highEstimate" value={state.calculatedValues.highEstimate} />
        </div>
      </div>
    </div>
  );
}; 