import React, { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';

export const People: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoader(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoader(false));
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {loader && <Loader />}

        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}

        {!errorMessage && people.length === 0 && !loader && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!loader && people.length > 0 && (
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
                <PeopleTable
                  person={person}
                  people={people}
                  key={person.slug}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
