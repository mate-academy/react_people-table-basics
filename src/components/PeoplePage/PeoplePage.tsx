import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { slug } = useParams();
  const selectedPersonName = slug ? slug : null;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable
        people={people}
        isLoading={isLoading}
        error={error}
        selectedPersonName={selectedPersonName}
      />
    </>
  );
};
