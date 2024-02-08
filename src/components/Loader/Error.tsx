import React from 'react';

interface ErrorMessage {
  error: string;
}
export const Error: React.FC<ErrorMessage> = ({ error }) => {
  return (
    <p data-cy="peopleLoadingError" className="has-text-danger">
      {error}
    </p>
  );
};
