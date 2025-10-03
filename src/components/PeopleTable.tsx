import { useState, useEffect } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

const nomesColunas = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length > 0 && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {nomesColunas.map(coluna => (
                    <th key={coluna}>{coluna}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {people.map(person => {
                  const mother = people.find(p => p.name === person.motherName);
                  const father = people.find(p => p.name === person.fatherName);

                  return (
                    <tr
                      data-cy="person"
                      key={person.slug}
                      className={
                        selectedSlug === person.slug
                          ? 'has-background-warning'
                          : ''
                      }
                    >
                      <td>
                        <PersonLink
                          person={person}
                          onSelect={setSelectedSlug}
                        />
                      </td>
                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {person.motherName ? (
                          mother ? (
                            <PersonLink
                              person={mother}
                              onSelect={setSelectedSlug}
                            />
                          ) : (
                            person.motherName
                          )
                        ) : (
                          '-'
                        )}
                      </td>
                      <td>
                        {person.fatherName ? (
                          father ? (
                            <PersonLink
                              person={father}
                              onSelect={setSelectedSlug}
                            />
                          ) : (
                            person.fatherName
                          )
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
