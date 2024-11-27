import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const { slug } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(
    slug || null,
  );

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const data = await getPeople();

        setPeople(data);
      } catch {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const findPersonByName = useCallback(
    (name: string | undefined | null): Person | null =>
      name
        ? people.find(p => p.name.toLowerCase() === name.toLowerCase()) || null
        : null,
    [people],
  );

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}
          {people.length === 0 && !loading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && (
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
                {people.map(person => {
                  const mother = person.motherName
                    ? findPersonByName(person.motherName)
                    : null;
                  const father = person.fatherName
                    ? findPersonByName(person.fatherName)
                    : null;

                  return (
                    <tr
                      key={person.slug}
                      data-cy="person"
                      className={classNames({
                        'has-background-warning':
                          person.slug === selectedPerson,
                      })}
                      onClick={() => setSelectedPerson(person.slug)}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>
                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {mother ? (
                          <PersonLink person={mother} />
                        ) : (
                          person.motherName || '-'
                        )}
                      </td>
                      <td>
                        {father ? (
                          <PersonLink person={father} />
                        ) : (
                          person.fatherName || '-'
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
