import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';

export const PeoplePage: React.FC = () => {
  const [currentPeople, setCurrentPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { personSlug } = useParams<{ personSlug: string }>();

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    getPeople()
      .then(data => {
        setCurrentPeople(data);
      })
      .catch(() => {
        setError(true);
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

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!error && !isLoading && currentPeople.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!error && !isLoading && currentPeople.length > 0 && (
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
                {currentPeople.map((person: Person) => {
                  const mother = currentPeople.find(
                    p => p.name === person.motherName,
                  );
                  const father = currentPeople.find(
                    p => p.name === person.fatherName,
                  );

                  return (
                    <tr
                      key={person.slug}
                      data-cy="person"
                      className={
                        person.slug === personSlug
                          ? 'has-background-warning'
                          : ''
                      }
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>

                      <td>
                        {mother ? (
                          <PersonLink person={mother} />
                        ) : (
                          person.motherName || '-'
                        )}
                      </td>

                      <td>
                        {father ? (
                          <PersonLink person={father} />
                        ) : (
                          person.fatherName || '-'
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
