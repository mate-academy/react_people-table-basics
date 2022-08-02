import { useEffect, useState } from 'react';
import { getPeopleWithParents } from '../api/people';
import { Person } from '../types/Person';
import { PeopleTable } from './PeopleTable/PeopleTable';

export const PeoplePage:React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeopleWithParents().then(setPeople);
  }, []);

  return (
    <PeopleTable people={people} />
  );
};
