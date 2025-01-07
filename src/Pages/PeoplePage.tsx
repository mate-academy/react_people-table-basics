import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => {
        peopleFromServer.map(person => {
          if (!person.motherName) {
            Object.assign(person, { motherName: '-' });
          } else {
            const foundedMother = peopleFromServer.find(
              identity => identity.name === person.motherName,
            );

            Object.assign(person, { mother: foundedMother });
          }

          if (!person.fatherName) {
            Object.assign(person, { fatherName: '-' });
          } else {
            const foundedFather = peopleFromServer.find(
              identity => identity.name === person.fatherName,
            );

            Object.assign(person, { father: foundedFather });
          }

          return person;
        });

        setPeople(peopleFromServer);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}
            {!isLoading && hasError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}
            {!isLoading && !hasError && !people.length && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}
            {!isLoading && !hasError && !!people.length && (
              <PeopleTable people={people} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
