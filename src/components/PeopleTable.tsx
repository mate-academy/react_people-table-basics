import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTableItem } from './PeopleTableItem';

export const PeopleTable = () => {
  const [visiblePeople, setVisiblePeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(people => {
        setVisiblePeople(people);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
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

        {visiblePeople?.length === 0 && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {visiblePeople && (
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
              {visiblePeople?.map(person => (
                <PeopleTableItem person={person} people={visiblePeople} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
