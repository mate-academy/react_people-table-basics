import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const loadPeople = async () => {
    try {
      setIsPeopleLoading(true);
      const loadedPeople = await getPeople();

      setPeople(loadedPeople);
    } catch {
      setErrorMessage(true);
    } finally {
      setIsPeopleLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isPeopleLoading
            ? <Loader />
            : (
              <>
                {errorMessage && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}
                {!people.length ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : (
                  <table
                    data-cy="peopleTable"
                    className="
                      table
                      is-striped
                      is-hoverable
                      is-narrow
                      is-fullwidth"
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
                        <PersonLink
                          key={person.slug}
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
