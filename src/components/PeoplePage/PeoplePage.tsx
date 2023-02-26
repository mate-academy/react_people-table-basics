import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [displayedPeople, setDisplayedPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(setDisplayedPeople)
      .catch(() => setHasLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        <PeopleTable
          isLoading={isLoading}
          hasLoadingError={hasLoadingError}
          displayedPeople={displayedPeople}
        />
      </div>
    </div>
  );
};
