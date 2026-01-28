import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { usePeople } from '../PeopleContext/PeopleContext';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeopleTable: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const { peopleFromServer, setPeopleFromServer } = usePeople();

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeopleFromServer(data);
      })
      .catch(() => setErrorMessage(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="section">
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

            {!isLoading && !errorMessage && peopleFromServer.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!isLoading && !errorMessage && peopleFromServer.length !== 0 && (
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
                  {peopleFromServer.map(person => (
                    <PersonLink person={person} key={person.slug} />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
