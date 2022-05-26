import { useEffect, useState } from 'react';
import { getPeopleFromServer } from '../api/api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const loadUsers = async () => {
    const peopleFromServer = await getPeopleFromServer();

    setPeople(peopleFromServer);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      <h1>People page</h1>
      <PeopleTable people={people} />
    </>
  );
};
