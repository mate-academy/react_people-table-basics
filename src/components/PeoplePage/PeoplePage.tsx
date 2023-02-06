import React, { useState, useEffect } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader/Loader';
import { getPeople } from '../../api';
import { PersonPage } from '../PersonPage/PersonPage';
import { tableHeaders } from '../constants/constants';

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

          {!isPeopleLoading && people.length === 0 && (
            <p data-cy="noPeopleMessage" className="box-error">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
            <table
              data-cy="peopleTable"
              className="table
                is-striped
                is-hoverable
                is-narrow
                is-fullwidth"
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
