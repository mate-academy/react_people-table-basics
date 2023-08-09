import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonRow } from './PersonRow';
import { Loader } from './Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(peopleFromServer => {
        const peopleWithParents = peopleFromServer.map(person => ({
          ...person,
          mother: peopleFromServer.find(p => p.name === person.motherName),
          father: peopleFromServer.find(p => p.name === person.fatherName),
        }));

        setPeople(peopleWithParents);
      })
      .catch(() => {
        setErrorMessage('Unable to load people');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {loading && <Loader />}

        {errorMessage && !loading && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}

        {!errorMessage && !loading && !people.length && (
          <p data-cy="noPeopleMessage" className="has-text-danger">
            There are no people on the server
          </p>
        )}

        {!errorMessage && !loading && people.length > 0 && (
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
                <PersonRow person={person} key={person.slug} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
