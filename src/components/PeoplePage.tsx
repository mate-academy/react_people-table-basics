import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeopleFromServer)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <PeopleTable
        people={peopleFromServer}
        loading={isLoading}
        hasError={hasError}
      />
    </div>
  );
};
