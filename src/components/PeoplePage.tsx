import { useEffect, useState } from 'react';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';

function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(loadedPeople => {
        setPeople(loadedPeople);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Something went wrong');
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <PeopleTable people={people} isLoading={isLoading} error={error} />
    </div>
  );
}

export default PeoplePage;
