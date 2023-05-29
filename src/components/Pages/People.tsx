import { useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { Loader } from '../Loader/Loader';
import { PeopleList } from '../PeopleList/PeopleList';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const isEmpty = people.length === 0;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((persons) => setPeople(persons))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isLoading
              && <Loader />}

            {isError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!isLoading
            && isEmpty
                && (
                  <p data-cy="noPeopleMessage">
                    No data
                  </p>
                )}

            {!isEmpty && (
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
