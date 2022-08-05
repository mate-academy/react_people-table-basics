import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/People';
import PeopleTable from './PeopleTable';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  return (
    <>
      <PeopleTable people={people} />
    </>

  );
};

export default PeoplePage;
