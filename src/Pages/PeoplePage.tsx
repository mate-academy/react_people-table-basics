import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import PeopleTable from '../components/PeopleTable';

const PEOPLE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    fetch(PEOPLE_URL)
      .then(res => res.json())
      .then(setPeople);
  }, []);

  return (
    <div>
      <h1>People Page</h1>
      <PeopleTable people={people} />
    </div>
  );
};

export default PeoplePage;
