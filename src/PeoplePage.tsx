import { useEffect, useState } from 'react';
import { getPeople } from './api';
import { PeopleTable } from './PeopleTable';
import { Person } from './react-app-env';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(setPeople);
  }, []);

  return (
    <div className="People">
      <h2 className="People">People page</h2>
      <PeopleTable people={people} />
    </div>
  );
};
