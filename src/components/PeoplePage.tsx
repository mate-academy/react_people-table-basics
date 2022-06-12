import { useEffect, useState } from 'react';
import { fetchPeople } from '../api/api';
import { Person } from '../types/Person';
import PeopleTable from './PeopleTable';

const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[] | null>(null);

  useEffect(() => {
    async function getPeople() {
      const result = await fetchPeople();

      setPeopleList(result);
    }

    getPeople();
  }, []);

  return (
    <div className="">
      <h1>People Page</h1>
      {peopleList && (
        <PeopleTable peopleList={peopleList} />
      )}
    </div>
  );
};

export default PeoplePage;
