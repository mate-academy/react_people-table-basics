import React, { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PersonLink } from '../../components/PersonLink';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  
  const showTable = people.length === 0 && !isLoaded;
  const showNoPeopleMessage = isLoaded && !errorMessage && people.length === 0;
  const showErrorMessage = errorMessage && people.length === 0;

  function getPeopleFromServer() {
    return getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setIsLoaded(true));
  }

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            {showTable && <Loader />}
            {people.length > 0 && (
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Sex</th>
                    <th>Born</th>
                    <th>Died</th>
                    <th>Mother</th>
                    <th>Father</th>
                  </tr>
                </thead>

                <tbody>
                  {people.map((person) => (
                    <PersonLink
                      people={people}
                      person={person}
                      key={person.slug}
                    />
                  ))}
                </tbody>
              </table>
            )}
            {showNoPeopleMessage && (
              <p data-cy="noPeopleMessage">
              There are no people on the server
              </p>
            )}
            {showErrorMessage && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
