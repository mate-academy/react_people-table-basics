import React, { useEffect, useMemo, useState } from 'react';
import { Loader } from './Loader';
import { PersonRow } from './PersonRow';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleUploaded, setPeopleUploaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);

    getPeople()
      .then((data) => (setPeople(data)))
      .catch(() => setHasError(true))
      .finally(() => setPeopleUploaded(true));
  }, []);

  const peopleWithParents = useMemo<Person[]>(() => (
    people.map((person, _, arr) => ({
      ...person,
      mother: arr.find(mother => mother.name === person.motherName),
      father: arr.find(father => father.name === person.fatherName),
    }))
  ), [people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {!peopleUploaded && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!hasError && peopleUploaded && people.length < 1 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {peopleUploaded && (
            <>
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
                  {peopleWithParents.map(person => (
                    <PersonRow
                      person={person}
                      key={person.slug}
                    />
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
};
