import React from 'react';
import { ErrorMessages } from '../../constants/ErrorMessages';

interface Props {
  errorMessage: ErrorMessages | null;
}

export const PeopleError: React.FC<Props> = ({ errorMessage }) => (
  <p data-cy="peopleLoadingError" className="has-text-danger">
    {errorMessage}
  </p>
);
