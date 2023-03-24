import React from 'react';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

type Props = {
  slug: string;
  people: Person[];
  hasError: boolean;
  isFetching: boolean;
};

export const RenderTable: React.FC<Props> = ({
  slug,
  people,
  hasError,
  isFetching,
}) => {
  if (isFetching) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (!people.length) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  return (
    <PeopleTable
      people={people}
      slug={slug}
    />
  );
};
