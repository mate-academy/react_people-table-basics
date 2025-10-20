import React, { useEffect, useState } from 'react';

import { PeopleList } from '../components/Loader/PeopleList';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedPersonSlug, setSelectedPersonSlug] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(data => setPeople(data))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="box table-container">
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!isLoading && !hasError && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!isLoading && !hasError && people.length > 0 && (
        <PeopleList
          people={people}
          selectedPersonSlug={selectedPersonSlug}
          onSelect={setSelectedPersonSlug}
        />
      )}
    </div>
  );
};
