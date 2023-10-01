import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PersonInfo } from '../PersonInfo';

const findParents = (people: Person[]) => (
  people.map(person => ({
    ...person,
    mother: people.find(mom => mom.name === person.motherName),
    father: people.find(dad => dad.name === person.fatherName),
  }))
);

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(currentPeople => {
        setPeople(findParents(currentPeople));
      })
      .catch(() => {
        setErrorMessage(true);
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
          {isLoading && (
            <Loader />
          )}
          {(errorMessage && !isLoading) && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(!people.length && !isLoading && !errorMessage) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {(!!people.length) && (
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
                {people.map(person => (
                  <PersonInfo
                    person={person}
                    key={person.slug}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
