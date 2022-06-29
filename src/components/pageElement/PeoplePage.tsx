import { useEffect, useState } from 'react';
import { getPeople } from '../api/api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<People[]>([]);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer));
  }, []);

  return (
    <>
      <h1>People page</h1>
      <PeopleTable people={people} />
    </>
  );
};
