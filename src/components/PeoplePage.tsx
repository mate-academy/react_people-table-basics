import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import PeopleTable from './PeopleTable';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const response = await getPeople();

      setPeople(response);
    };

    fetchPeople()
      .catch((errorText) => {
        throw new Error(errorText);
      });
  }, []);

  return (
    <div className="people">
      <h1 className="is-size-1">People table</h1>
      <PeopleTable people={people} />
    </div>
  );
};

export default PeoplePage;
