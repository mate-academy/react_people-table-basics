import React from 'react';

export const Wrong: React.FC = () => {
  return (
    <p data-cy="peopleLoadingError" className="has-text-danger">
      Something went wrong
    </p>
  );
};
