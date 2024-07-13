import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import classNames from 'classnames';
import { NavLink, useParams } from 'react-router-dom';

export const PersonList = () => {
  const [peopleFromApi, setPeopleFromApi] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  const selectedPerson = slug ? slug : '';

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(people => {
        const findParents = people.map(person => {
          return {
            ...person,
            mother: people.find(child => child.name === person.motherName),
            father: people.find(child => child.name === person.fatherName),
          };
        });

        setPeopleFromApi(findParents);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!loading && !peopleFromApi.length && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}
            {loading ? (
              <Loader />
            ) : (
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
                  {peopleFromApi.map(person => (
                    <tr
                      data-cy="person"
                      key={person.slug}
                      className={classNames({
                        'has-background-warning':
                          selectedPerson === person.slug,
                      })}
                    >
                      <td>
                        <NavLink
                          to={`/people/${person.slug}`}
                          className={classNames({
                            'has-text-danger': person.sex === 'f',
                          })}
                        >
                          {person.name}
                        </NavLink>
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {person.mother ? (
                          <NavLink
                            to={`/people/${person.mother.slug}`}
                            className="has-text-danger"
                          >
                            {person.motherName}
                          </NavLink>
                        ) : (
                          person.motherName || '-'
                        )}
                      </td>
                      <td>
                        {person.father ? (
                          <NavLink to={`/people/${person.father.slug}`}>
                            {person.fatherName}
                          </NavLink>
                        ) : (
                          person.fatherName || '-'
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
