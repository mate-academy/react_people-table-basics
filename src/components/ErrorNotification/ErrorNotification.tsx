import React from 'react';

type Props = {
  message: string;
};

export const ErrorNotification: React.FC<Props> = ({ message }) => (
  <>
    {message === 'Something went wrong' ? (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        { message }
      </p>
    ) : (
      <p data-cy="noPeopleMessage">
        { message }
      </p>
    )}
  </>
);
