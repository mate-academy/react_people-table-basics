import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

type Error =
  | 'Something went wrong'
  | 'There are no people on the server'
  | 'none';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>('none');

  useEffect(() => {
    setError('none');
    setLoading(true);
    getPeople()
      .then(fetchedPeople => {
        if (fetchedPeople.length === 0) {
          setError('There are no people on the server');
        } else {
          setPeople(fetchedPeople);
        }
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}

      {error === 'Something went wrong' && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>
      )}

      {error === 'There are no people on the server' && (
        <p data-cy="noPeopleMessage">{error}</p>
      )}

      {!loading && error === 'none' && <PeopleTable people={people} />}
    </>
  );
};
