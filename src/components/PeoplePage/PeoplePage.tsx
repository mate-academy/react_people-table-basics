import React from 'react';
import { Loader } from '../Loader/Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { usePeople } from '../utils/usePeople';

export const PeoplePage: React.FC = () => {
  const { people, error, slug } = usePeople();

  if (error) {
    return (
      <>
        <h1 className="title">People Page</h1>
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      </>
    );
  }

  if (!people) {
    return (
      <>
        <h1 className="title">People Page</h1>
        <Loader />
      </>
    );
  }

  if (people.length === 0) {
    return (
      <>
        <h1 className="title">People Page</h1>
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      </>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable people={people} selectedSlug={slug ?? undefined} />
    </>
  );
};
