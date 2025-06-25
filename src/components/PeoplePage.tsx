import { Outlet } from 'react-router-dom';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonData } from './Person';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';

type Props = {};

export const PeoplePage: React.FC<Props> = ({}) => {
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(data => {
        if (data.length === 0) {
          setIsEmpty(true);
          setHasError(false);
        } else {
          setAllPeople(data);
          setIsEmpty(false);
          setHasError(false);
        }
      })
      .catch(() => {
        setHasError(true);
        setIsEmpty(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Outlet />

      <div className="block">
        <div className="box table-container">
          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isEmpty && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {isLoading ? (
            <Loader />
          ) : (
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

              <PersonData allPeople={allPeople} />
            </table>
          )}
        </div>
      </div>
    </>
  );
};
