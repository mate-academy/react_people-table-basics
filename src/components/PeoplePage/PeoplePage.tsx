import { FC, useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonInfo } from '../PersonInfo';

enum ErrorType {
  NoPeople = 'There are no people on the server',
  Another = 'Something went wrong',
}

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<ErrorType>();

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const peoplesFromServer = await getPeople();

      setPeople(peoplesFromServer);
    } catch {
      setErrorType(ErrorType.Another);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorType}
          </p>

          {!isLoading && (
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
