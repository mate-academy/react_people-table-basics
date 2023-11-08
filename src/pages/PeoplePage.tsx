import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PersonInfo } from '../components/PersonInfo';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [peopleLoading, setPeopleLoading] = useState(false);
  const [peopleLoadingError, setPeopleLoadingError] = useState(false);

  const { personId } = useParams();
  const renderTable = !peopleLoading && people && people.length > 0;
  const renderNoPeopleError = !peopleLoading && people && people.length === 0;

  useEffect(() => {
    setPeopleLoadingError(false);
    setPeopleLoading(true);

    getPeople()
      .then((response) => {
        setPeople(response as Person[]);
      })
      .catch(() => setPeopleLoadingError(true))
      .finally(() => setPeopleLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {peopleLoading && <Loader />}

          {peopleLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {renderTable && (
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
                    people={people}
                    personId={personId}
                  />
                ))}
              </tbody>
            </table>
          )}

          {renderNoPeopleError && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
