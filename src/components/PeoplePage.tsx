import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then((loadedPeople) => {
      setPeople(loadedPeople);
    });
  }, []);

  return (
    <>
      <h1 className="title has-text-centered mt-5">People Page</h1>
      <PeopleTable people={people} />
    </>
  );
};
