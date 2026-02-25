import { useState } from 'react';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <PeopleTable people={people} setPeople={setPeople} />
      </div>
    </>
  );
};
