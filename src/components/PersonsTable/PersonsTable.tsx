import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { useEffect, useState } from 'react';
import { PersonLink } from '../PersonLink/PersonLink';

export const PersonsTable = () => {
  const [persons, setPersons] = useState<Person[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isError, setIsError] = useState(false);

  const checkForUserOnServer = persons.length > 0 && !isLoading;

  const chechOnErrorMessage = !persons.length && !isLoading && !isError;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(peopleData => {
        setIsError(false);
        setPersons(peopleData);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {chechOnErrorMessage && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}
        {checkForUserOnServer && (
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
              {persons.map(person => {
                return (
                  <PersonLink
                    key={person.slug}
                    person={person}
                    persons={persons}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
