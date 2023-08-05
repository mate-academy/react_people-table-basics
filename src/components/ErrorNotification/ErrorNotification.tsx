import { useContext } from 'react';

import { Error } from '../../types/Error';

import { PeopleContext } from '../../context/PeopleContext';

export const ErrorNotification = () => {
  const { errorMessage } = useContext(PeopleContext);

  return (
    <>
      {errorMessage === Error.SERVER && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {errorMessage}
        </p>
      )}

      {errorMessage === Error.DATA && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}
    </>
  );
};
