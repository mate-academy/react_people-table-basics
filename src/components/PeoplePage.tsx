import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const loadPeople = async () => {
      const data = await getPeople();

      setPeople(data);
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {people && <PeopleTable people={people} />}
    </>
  );
};
