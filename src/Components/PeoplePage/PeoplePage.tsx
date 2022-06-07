import { useState, useEffect } from 'react';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const peopleData = async () => {
    const data = await getPeople();

    setPeople(data);
  };

  useEffect(() => {
    peopleData();
  }, []);

  return (
    <>
      <h2 className="m-2 p-2">People Page</h2>
      <PeopleTable people={people} />
    </>
  );
};
