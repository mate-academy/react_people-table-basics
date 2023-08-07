/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getAll } from '../../utils/fetchClient';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAll()
      .then((peopleFromServer) => {
        setVisiblePeople(peopleFromServer);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {error
              ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )
              : (
                loading
                  ? <Loader />
                  : visiblePeople.length === 0
                    ? (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )
                    : (
                      <PeopleTable people={visiblePeople} />
                    )
              )}
          </div>
        </div>
      </div>
    </main>
  );
};
