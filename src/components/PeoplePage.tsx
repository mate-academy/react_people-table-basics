import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from './Loader';
import { Person } from '../types';

export const PeoplePage = () => {
  const [data, setData] = useState<Person[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { personId } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch('/api/people.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Помилка завантаження JSON');
        }

        return response.json();
      })
      .then(people => {
        setError(null);
        setData(Array.isArray(people) ? people : []);
      })
      .catch(() => {
        setError('Something went wrong');
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const getPersonSlug = (name: string, born: number) =>
    `${name.toLowerCase().trim().replace(/\s+/g, '-')}-${born}`;

  const getPersonByName = (name: string | null) =>
    data?.find(person => person.name === name) || null;

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {loading && <Loader />}

            {!loading && error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {error}
              </p>
            )}

            {!loading && !error && Array.isArray(data) && data.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!loading && !error && data && data.length > 0 && (
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
                  {data.map((person, index) => {
                    const slug = getPersonSlug(person.name, person.born);
                    const mother = getPersonByName(person.motherName || null);
                    const father = getPersonByName(person.fatherName || null);

                    return (
                      <tr
                        key={index}
                        data-cy="person"
                        className={classNames({
                          'has-background-warning': personId === slug,
                        })}
                      >
                        <td>
                          <NavLink
                            className={classNames({
                              'has-text-danger': person.sex === 'f',
                            })}
                            to={`/people/${slug}`}
                          >
                            {person.name}
                          </NavLink>
                        </td>

                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>

                        <td>
                          {person.motherName ? (
                            mother ? (
                              <NavLink
                                to={`/people/${getPersonSlug(mother.name, mother.born)}`}
                                className="has-text-danger"
                              >
                                {mother.name}
                              </NavLink>
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
                              <NavLink
                                to={`/people/${getPersonSlug(father.name, father.born)}`}
                              >
                                {father.name}
                              </NavLink>
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
    </main>
  );
};
