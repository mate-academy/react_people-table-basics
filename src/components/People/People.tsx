import { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from '../PersonLink/PersonLink';

export const People = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setHasError(true);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {people && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!people ? (
            <Loader />
          ) : (
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
                {people &&
                  people.length > 0 &&
                  people.map((person, index) => (
                    <PersonLink key={index} person={person} people={people} />
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
