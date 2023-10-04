import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { findPersonByName } from '../utils/helpers';

export const PeoplePage = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(response => {
        const newPeople = response.map(person => ({
          ...person,
          mother: findPersonByName(response, person.motherName),
          father: findPersonByName(response, person.fatherName),
        }));

        setPeople(newPeople);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const isErrorDuringLoading = !isLoading && isError;
  const isEverythingOk = !isError && !isLoading && !!people.length;
  const isNoPeopleOnServer = !isError && !isLoading && !people.length;

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}
          {isErrorDuringLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {isNoPeopleOnServer && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
          {isEverythingOk && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </div>
  );
};
