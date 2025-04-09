import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <PeopleTable
          people={people}
          selectedSlug={slug || null}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </>
  );
};
