import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PersonInfo } from '../components/PersonInfo';
import { preparePeopleData } from '../helpers/prepareData';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [peopleLoading, setPeopleLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);

  const { personId } = useParams();
  const isDataAvailable = !peopleLoading && people && people.length > 0;
  const isArrayEmpty = !peopleLoading && people && people.length === 0;

  useEffect(() => {
    setIsLoadingError(false);
    setPeopleLoading(true);

    getPeople()
      .then((response) => {
        const preparedData = preparePeopleData(response);

        setPeople(preparedData);
      })
      .catch(() => setIsLoadingError(true))
      .finally(() => setPeopleLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {peopleLoading && <Loader />}

          {isLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isDataAvailable && (
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
                    key={person.slug}
                    person={person}
                    personId={personId}
                  />
                ))}
              </tbody>
            </table>
          )}

          {isArrayEmpty && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
