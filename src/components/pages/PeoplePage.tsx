import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { Loader } from '../Loader';

export const PeoplePage = () => {
  const [person, setPerson] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const isListEmpty = !person.length && !isLoading && !isError;

  const getPeopleServer = async () => {
    setLoading(true);
    try {
      const arrayPeople = await getPeople();

      setPerson(arrayPeople);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPeopleServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {(!isLoading && !isListEmpty) && <PeopleTable person={person} />}

          {isError && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {isListEmpty && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
