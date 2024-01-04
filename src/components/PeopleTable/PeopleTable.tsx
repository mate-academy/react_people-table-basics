import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { ErrorType } from '../../types/error-enum';
import { PersonInfo } from '../PersonInfo/PersonInfo';

export const PeoplePage = () => {
  const [peopleFS, setPeopleFS] = useState<Person[] | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const hasNoPeopleFromSrver = peopleFS?.length === 0;
  const hasLoadingError = error === ErrorType.PEOPLE_LOADING;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(people => {
        setPeopleFS(people);
      })
      .catch(() => setError(ErrorType.PEOPLE_LOADING))
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

          {hasNoPeopleFromSrver && !error
            && (
              <p data-cy="noPeopleMessage">
                {ErrorType.NO_PEOPLE_ON_SERVER}
              </p>
            )}

          {hasLoadingError
            && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {ErrorType.PEOPLE_LOADING}
              </p>
            )}

          {peopleFS
            && (
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

                  {peopleFS?.map(person => (
                    <PersonInfo
                      key={person.slug}
                      person={person}
                      peopleFromServer={peopleFS}
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
