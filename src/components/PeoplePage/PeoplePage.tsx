import React, { useEffect, useState } from 'react';
import cn from 'classnames'

import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink/PersonLink';
import { useParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {slug} = useParams();

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

            {!loading && !error && people.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!loading && !error && people.length > 0 && (
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
                    <tr
                      key={person.slug}
                      data-cy="person"
                      className={cn({'has-background-warning':slug === person.slug})}
                    >
                      <td>
                        <PersonLink person={person}/>
                      </td>
                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                      {person.motherName ? (
                        findPersonByName(person.motherName) ?
                        (<PersonLink person={findPersonByName(person.motherName)} />
                        ) : (
                          person.motherName
                        )

                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                      {person.fatherName ? (
                        findPersonByName(person.fatherName) ?
                        (<PersonLink person={findPersonByName(person.fatherName)} />
                        ) : (
                          person.fatherName
                        )

                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
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
