import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { slug = '' } = useParams();

  const isPeople = !isLoading && !hasError && people.length > 0;
  const isEmptyTable = !isLoading && !hasError && people.length === 0;

  const fetchPeople = useCallback(async () => {
    try {
      setHasError(false);

      const data = await getPeople();

      setPeople(data);

      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPeople();
  }, []);

  if (hasError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader /> }

          {isPeople && (
            <>
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable
                    is-narrow is-fullwidth"
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

                <PeopleTable people={people} slug={slug} />
              </table>
            </>
          )}

          {isEmptyTable && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          ) }
        </div>
      </div>
    </>
  );
};
