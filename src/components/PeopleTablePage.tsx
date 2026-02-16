import { useParams } from 'react-router-dom';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { useState, useEffect } from 'react';
import { getPeople } from '../api';
import { Loader } from './Loader';

export const PeopleTablePage = () => {
  const { person } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
      })
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

      {isLoading && <Loader />}

      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!isLoading && !error && !people.length && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!isLoading && !error && people.length > 0 && (
        <PeopleTable people={people} selectedPerson={person} />
      )}
    </>
  );
};
