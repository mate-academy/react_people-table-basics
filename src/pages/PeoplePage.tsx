import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';

function preparePeople(people: Person[]): Person[] {
  return people.map(person => {
    const mother = people.find(p => p.name === person.motherName);
    const father = people.find(p => p.name === person.fatherName);

    return ({
      ...person,
      mother,
      father,
    });
  });
}

export const PeoplePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { personId } = useParams();

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(data => {
        const preparedPeople = preparePeople(data);

        setPeople(preparedPeople);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : (
            <>
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!errorMessage && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!errorMessage && people.length > 0 && (
                <table
                  data-cy="peopleTable"
                  className="table is-striped is-hoverable
                  is-narrow is-fullwidth"
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
                        data-cy="person"
                        key={person.slug}
                        className={cn({
                          'has-background-warning': personId === person.slug,
                        })}
                      >
                        <td>
                          <Link
                            to={`/people/${person.slug}`}
                            className={cn({
                              'has-text-danger': person.sex === 'f',
                            })}
                          >
                            {person.name}
                          </Link>
                        </td>

                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          {person.mother ? (
                            <Link
                              className="has-text-danger"
                              to={`/people/${person.mother.slug}`}
                            >
                              {person.motherName}
                            </Link>
                          ) : (
                            person.motherName || '-'
                          )}
                        </td>

                        <td>
                          {person.father ? (
                            <Link
                              to={`/people/${person.father.slug}`}
                            >
                              {person.fatherName}
                            </Link>
                          ) : (
                            person.fatherName || '-'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
