import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { PeopleTable } from '../PeopleTable/PeopleTable';

type Props = {
  isError: boolean,
  arePeoplePresent: boolean,
  isLoading: boolean,
  people: Person[],
};

export const PeoplePage: React.FC<Props> = ({
  isError,
  arePeoplePresent,
  isLoading,
  people,
}) => {
  const { peopleSlug = null } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      {isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!arePeoplePresent && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      <PeopleTable
        people={people}
        isLoading={isLoading}
        selectPeopleSlug={peopleSlug}
      />
    </>
  );
};
