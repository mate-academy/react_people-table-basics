import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import PeopleTable from './PeopleTable';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchPeoples = async () => {
      const response = await getPeople();

      setPeople(response);
    };

    try {
      fetchPeoples();
    } catch (error) {
      throw new Error(`${error}`);
    }
  }, []);

  return (
    <div className="people">
      <h1 className="is-size-1">People table</h1>
      <PeopleTable people={people} />
    </div>
  );
};

export default PeoplePage;
