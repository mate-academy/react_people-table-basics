import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const preparedParents = (parents: Person[]) =>
    parents.map(parent => ({
      ...parent,
      mother: parents.find(({ name }) => name === parent.motherName),
      father: parents.find(({ name }) => name === parent.fatherName),
    }));

  useEffect(() => {
    setErrorMessage(false);
    setIsLoading(true);

    getPeople()
      .then(data => setPeople(preparedParents(data)))
      .catch(error => {
        setErrorMessage(true);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !errorMessage && <PeopleTable people={people} />}
        </div>
      </div>
    </div>
  );
};
