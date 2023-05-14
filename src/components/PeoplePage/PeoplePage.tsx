import React from 'react';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { Person } from '../../types/Person';

type Props = {
  people: Person[];
  error: boolean;
};

export const PeoplePage: React.FC<Props> = ({ people, error }) => {
  return (
    <>
      <h1 className="title">People Page</h1>

      <PeopleTable people={people} error={error} />
    </>
  );
};
