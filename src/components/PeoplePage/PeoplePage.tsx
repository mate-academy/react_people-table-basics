import { Person } from '../../types/Person';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { useState, useEffect } from 'react';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
        // Handle error silently or use proper error handling
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable isLoading={isLoading} people={people} />
    </>
  );
};
