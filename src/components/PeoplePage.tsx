import { FC, useState, useEffect } from 'react';
import { getPeople } from '../data';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(data => setPeople(data));
  }, []);

  return (
    <PeopleTable people={people} />
  );
};
