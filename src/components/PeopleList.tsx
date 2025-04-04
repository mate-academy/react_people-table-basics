import React, { useState, useEffect } from 'react';
import { getPeople } from '../api';
import { PersonType } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

export const PeopleList = () => {
  const [people, setPeople] = useState<PersonType[]>();
  const [loading, setLoading] = useState(false);

  const peopleDownload = () => {
    setLoading(true);

    getPeople()
      .then(response => {
        setPeople(response);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    peopleDownload();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {!loading && !people && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && people?.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && people && (
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
                  <PersonLink
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
