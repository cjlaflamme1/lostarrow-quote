import React from 'react';

interface QuestionWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  error?: string;
  helpText?: string;
}

export const QuestionWrapper: React.FC<QuestionWrapperProps> = ({
  title,
  description,
  children,
  error,
  helpText
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-primary mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-secondary text-base">
              {description}
            </p>
          )}
        </div>

        <div className="mb-6">
          {children}
        </div>

        {helpText && (
          <div className="mb-4">
            <p className="text-sm text-secondary bg-blue-50 p-3 rounded-md border border-blue-200">
              💡 {helpText}
            </p>
          </div>
        )}

        {error && (
          <div className="alert alert-error" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}; 