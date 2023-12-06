import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { PersonType } from '../types';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<PersonType[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoadig] = useState(false);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    getPeople()
      .then((data) => {
        if (data.length < 1) {
          setNoData(true);
        }

        setPeople(data);
        setIsLoadig(true);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoadig(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {isLoading
            && <Loader />}

          {error
            && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

          {noData
            && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <tbody>
              {people && <PeopleTable people={people} />}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
