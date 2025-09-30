import React, { useEffect, useState } from 'react';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError('Failed to fetch people'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
        )}

        {isLoading ? (
          <Loader />
        ) : people.length === 0 ? (
          <p data-cy="noPeopleMessage" className="has-text-grey">
            no people
          </p>
        ) : (
          <PeopleTable people={people} selectedSlug={slug} />
        )}
      </div>
    </div>
  );
};
