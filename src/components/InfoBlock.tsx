import React from 'react';
import { Loader } from './Loader';

type Props = {
  isLoading: boolean;
  hasError: boolean;
  isEmpty: boolean;
};

export const InfoBlock: React.FC<Props> = ({
  isLoading,
  hasError,
  isEmpty,
}) => {
  if (isLoading) {
    return <Loader />;
  } else if (hasError) {
    return (
      <>
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
        <img src="https://http.cat/599" alt="connection error" />
      </>
    );
  } else {
    return (
      isEmpty && (
        <>
          <p data-cy="noPeopleMessage">There are no people on the server</p>
          <img src="https://http.cat/204" alt="empty" />
        </>
      )
    );
  }
};
