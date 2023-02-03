import React, { useState, useEffect, useMemo } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader/Loader';
import { getPeople } from '../../api';
import { PersonPage } from '../PersonPage/PersonPage';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);
  const [isPeopleError, setIsPeopleError] = useState(false);

  useEffect(() => {
    setIsPeopleLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsPeopleError(true))
      .finally(() => setIsPeopleLoading(false));
  }, []);

  const tableHeaders = useMemo(() => [
    { id: 1, title: 'Name' },
    { id: 2, title: 'Sex' },
    { id: 3, title: 'Born' },
    { id: 4, title: 'Died' },
    { id: 5, title: 'Mother' },
    { id: 6, title: 'Father' },
  ], []);

  const isNoPeople = useMemo(() => (
    !isPeopleLoading && !people.length && isPeopleError),
  []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">

          {isPeopleLoading && (
            <Loader />
          )}

          {isPeopleError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isNoPeople && (
            <p data-cy="noPeopleMessage" className="box-error">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
            <table
              data-cy="peopleTable"
              // eslint-disable-next-line max-len
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {tableHeaders.map(header => (
                    <th key={header.id}>
                      {header.title}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {people.map(person => (
                  <PersonPage
                    key={person.slug}
                    person={person}
                    people={people}
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
