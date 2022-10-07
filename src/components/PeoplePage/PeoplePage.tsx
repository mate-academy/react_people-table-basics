import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import classNames from 'classnames';
import { Loader } from '../Loader';
import { getPeople } from '../api/api';
import { Person } from '../../types';
// import { PersonLink } from '../PersonLink';
import { PersonDetails } from '../PersonDetails';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const noPeopleCondition = !isLoading && people.length === 0 && !hasError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {hasError ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : (
            <>
              {noPeopleCondition && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!isLoading && (
                <table
                  data-cy="peopleTable"
                  className="
                    table is-striped
                    is-hoverable
                    is-narrow
                    is-fullwidth
                  "
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
                    {people.map(person => (
                      <PersonDetails
                        person={person}
                        people={people}
                      />
                    ))}
                  </tbody>
                </table>
              )}

            </>
          )}
        </div>
      </div>
    </>
  );
};
