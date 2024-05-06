import { Fragment } from 'react/jsx-runtime';
import { Loader } from './Loader';
import { Person } from '../types';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();

  function addParents(person: Person, peopleFromServer: Person[]) {
    const mother = peopleFromServer.find(
      pers => pers.name === person.motherName,
    );
    const father = peopleFromServer.find(
      pers => pers.name === person.fatherName,
    );

    return { ...person, father, mother };
  }

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(result => {
        setPeople(result.map(person => addParents(person, result)));
        setTimeout(() => setIsLoading(false), 300);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return (
    <Fragment>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && !isError && <Loader />}
          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {!isError && !isLoading && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
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
                  className={classNames({
                    'has-background-warning': person.slug === slug,
                  })}
                  key={person.slug}
                  data-cy="person"
                >
                  <td>
                    <Link
                      className={classNames({
                        'has-text-danger': person.sex === 'f',
                      })}
                      to={`/people/${person.slug}`}
                    >
                      {person.name}
                    </Link>
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.motherName ? (
                      <Fragment>
                        {person.mother ? (
                          <Link
                            className={classNames({
                              'has-text-danger': person.sex === 'f',
                            })}
                            to={`/people/${person.mother.slug}`}
                          >
                            {person.motherName}
                          </Link>
                        ) : (
                          <>{person.motherName}</>
                        )}
                      </Fragment>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {person.fatherName ? (
                      <Fragment>
                        {person.father ? (
                          <Link
                            className={classNames({
                              'has-text-danger': person.sex === 'f',
                            })}
                            to={`/people/${person.father.slug}`}
                          >
                            {person.fatherName}
                          </Link>
                        ) : (
                          <>{person.fatherName}</>
                        )}
                      </Fragment>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};
