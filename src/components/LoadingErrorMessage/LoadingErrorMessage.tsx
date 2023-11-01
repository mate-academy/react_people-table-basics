import React from 'react';

export const LoadingErrorMessage: React.FC = () => {
  return (
    <p data-cy="peopleLoadingError" className="has-text-danger">
      Something went wrong
    </p>
  );
};
