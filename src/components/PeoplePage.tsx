import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

import { PeopleTable } from '../components/PeopleTable';
import { Loader } from './Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}
      {errorMessage && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!loading && !errorMessage && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!loading && !errorMessage && people.length > 0 && (
        <PeopleTable people={people} />
      )}
    </>
  );
};
