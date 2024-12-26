import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { Error } from '../types/Error';
import { Table } from './PeopleTable';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(Error.Default);

  const loadPeople = () => {
    setIsLoading(true);
    setError(Error.Default);

    getPeople()
      .then(peop => {
        const peopleWithFamily = peop.map(person => {
          const father = peop.find(pers => pers.name === person.fatherName);
          const mother = peop.find(pers => pers.name === person.motherName);

          return {
            ...person,
            father,
            mother,
          };
        });

        setPeople(peopleWithFamily);
      })
      .catch(() => setError(Error.Load))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoading && !error && <Loader />}
        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
        )}

        {people.length === 0 && !error && !isLoading && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}
        {!isLoading && people.length > 0 && <Table people={people} />}
      </div>
    </>
  );
};
