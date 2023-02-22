import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayedPeople, setDisplayedPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(setDisplayedPeople)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <PeopleTable isLoading={isLoading} displayedPeople={displayedPeople} />
    </div>
  );
};
