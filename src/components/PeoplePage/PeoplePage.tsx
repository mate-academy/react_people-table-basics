import React, { useEffect, useState } from 'react';


import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';

import { useParams } from 'react-router-dom';
import { PersonDetails } from '../PersonDetails/PersonDetails';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(false);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const findPersonByName = (name: string | undefined): Person | undefined => {
    return people.find(person => person.name === name);
  };

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            {loading && <Loader />}

            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!loading && !error && !people.length && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!loading && !error && !!people.length && (
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
                     <PersonDetails
                        key={person.slug}
                        person={person}
                        isSelected={slug === person.slug}
                        findPersonByName={findPersonByName}
                     />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
