import { useEffect, useState } from 'react';
import { PeopleList } from '../../components/PeopleList/PeopleList';

import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { Loader } from '../../components/Loader';
import { ErrorType } from '../../types/ErrorType';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isErrorLoading, setIsErrorLoading] = useState(false);

  const isPeopleInServer = people.length > 0;

  const loadPeople = () => {
    setIsLoading(true);

    getPeople()
      .then((persons) => setPeople(persons))
      .catch(() => setIsErrorLoading(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}

            {isErrorLoading && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {ErrorType.loadingError}
              </p>
            )}

            {!isLoading
              && !isPeopleInServer
                && (
                  <p data-cy="noPeopleMessage">
                    {ErrorType.missingData}
                  </p>
                )}

            {isPeopleInServer && (
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

                <PeopleList people={people} />

              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
