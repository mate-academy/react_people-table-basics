import React from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { ErrorComponent } from '../ErrorComponent/ErrorComponent';
import { EmptyComponent } from '../EmptyComponent/EmptyComponent';
import { PeopleComponent } from '../PeopleComponent/PeopleComponent';

interface Props {
  people: Person[],
  isLoading: boolean
  errorMessage: string
}

export const PeoplePage: React.FC<Props> = ({
  people,
  isLoading,
  errorMessage,
}) => {
  const isDisplayErrorMessage = errorMessage && !isLoading;
  const isNoPeopleOnServer = !people.length && !isLoading && !errorMessage;
  const isPeopleOnServer = !!people.length && !errorMessage;

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoading && <Loader />}

        {isDisplayErrorMessage && (
          <ErrorComponent errorMessage={errorMessage} />
        )}

        {isNoPeopleOnServer && <EmptyComponent /> }

        {isPeopleOnServer && <PeopleComponent people={people} />}
      </div>
    </div>
  );
};
