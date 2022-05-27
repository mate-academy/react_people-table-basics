import { useState, useEffect } from 'react';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const newPeople = async () => {
      const all = await getPeople();

      setPeople(all);
    };

    newPeople();
  }, []);

  return (
    <PeopleTable people={people} />
  );
};
