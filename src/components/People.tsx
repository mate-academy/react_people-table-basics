import { Loader } from './Loader';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { PersonLink } from './Loader/PersonLink';

export const People = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(gotPeople => {
        const adjustedPeople = gotPeople.map(person => {
          const personMother = gotPeople.find(
            currentPerson => currentPerson.name === person.motherName,
          );
          const personFather = gotPeople.find(
            currentPerson => currentPerson.name === person.fatherName,
          );

          return { ...person, mother: personMother, father: personFather };
        });

        setPeopleFromServer(adjustedPeople);
      })
      .catch(() => setHasError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && !isLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && peopleFromServer.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {!isLoading && peopleFromServer.length !== 0 && (
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
  );
};
