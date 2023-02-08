import React, { memo, useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Person } from '../types';

export const PeoplePage: React.FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [arePeopleLoaded, setArePeopleLoaded] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServer) => {
        const peopleWithParents = peopleFromServer.map(person => {
          return {
            ...person,
            mother: peopleFromServer
              .find(woman => woman.name === person.motherName),
            father: peopleFromServer
              .find(man => man.name === person.fatherName),
          };
        });

        setPeople(peopleWithParents);
        setArePeopleLoaded(true);
      })
      .catch(() => setShowError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const arePeopleOnServer = arePeopleLoaded && people.length > 0;
  const noPeopleOnServer = arePeopleLoaded && people.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {showError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {noPeopleOnServer && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {arePeopleOnServer && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
});
