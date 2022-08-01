import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fillPeopleList = async () => {
      setPeople(await getPeople());
    };

    try {
      fillPeopleList();
    } catch (error) {
      throw new Error(`Unexpected error ${error}`);
    }
  }, []);

  return (
    <>
      <h2>People page</h2>
      <PeopleTable people={people} />
    </>
  );
};
