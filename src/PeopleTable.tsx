import React, { useEffect, useState } from 'react';
import { getPeople } from './api';
import { Person } from './types/Person';
import { Loader } from './components/Loader';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getPeople()
      .then((fetchedPeople) => {
        setPeople(fetchedPeople);
        setIsLoaded(true);
      })
      .catch(() => setHasError(true));
  }, []);

  const loadedComponent = isLoaded
    ? (
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
            <tr key={person.slug} data-cy="person">
              <td>
                <a href={`#/people/${person.slug}`}>
                  {person.name}
                </a>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{person.motherName}</td>
              <td>{person.fatherName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
    : (
      <Loader />
    );

  return (
    <>
      <div className="block">
        <div className="box table-container">
          {hasError
          && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length < 0
            ? (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )
            : loadedComponent}
        </div>
      </div>
    </>
  );
};
