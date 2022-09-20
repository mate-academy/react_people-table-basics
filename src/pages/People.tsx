import { useEffect, useState } from 'react';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

import { getPeople } from '../api';

import { Person } from '../types';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => {
        const peopleToDisplay = peopleFromServer
          .map(person => ({
            ...person,
            mother: peopleFromServer.find(
              somebody => somebody.name === person.motherName,
            ),
            father: peopleFromServer.find(
              somebody => somebody.name === person.fatherName,
            ),
          }));

        setPeople(peopleToDisplay);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !isError && !people.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
