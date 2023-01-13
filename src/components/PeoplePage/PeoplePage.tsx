import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setTimeout(() => setHasError(false), 3000);
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <PeopleTable
          people={people}
          hasError={hasError}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};
