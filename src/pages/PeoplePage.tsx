import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [person, setPerson] = useState<Person[]>([]);
  const { slug = '' } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(res => setPerson(res))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {!isLoading && !error && !person.length && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      {!isLoading && !error && person.length && (
        <PeopleTable
          persons={person}
          selectedPerson={slug}
        />
      )}

      {isLoading && <Loader /> }
      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
    </>
  );
};
