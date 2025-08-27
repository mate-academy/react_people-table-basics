import React, { useState, useEffect } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PersonLink } from '../components/PersonLink/PersonLink';
import { useParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    getPeople()
      .then(fetchedPeople => {
        const peopleMap: Record<string, Person> = Object.fromEntries(
          fetchedPeople.map(p => [p.name, p]),
        );

        const peopleWithParents = fetchedPeople.map(p => ({
          ...p,
          mother: p.motherName ? peopleMap[p.motherName] : undefined,
          father: p.fatherName ? peopleMap[p.fatherName] : undefined,
        }));

        setPeople(peopleWithParents);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div data-cy="app">
      <div className="block">
        <h1 className="title">People Page</h1>

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
                    className={
                      person.slug === slug ? 'has-background-warning' : ''
                    }
                  >
                    <td>
                      <PersonLink person={person} name={person.name} />
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      <PersonLink
                        person={person.mother}
                        name={person.motherName}
                      />
                    </td>
                    <td>
                      <PersonLink
                        person={person.father}
                        name={person.fatherName}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
