import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { slug } = useParams();

  getPeople()
    .then((r) => {
      setPeople(r);

      if (r.length === 0) {
        setErrorMessage('There are no people on the server');
      }
    })
    .catch(() => setErrorMessage('Something went wrong'));

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {errorMessage === 'Something went wrong' && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {errorMessage === 'There are no people on the server' && (
            <p data-cy="noPeopleMessage">
              {errorMessage}
            </p>
          )}

          {people ? (
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
                  const mother = people
                    .find(p => p.name === person.motherName);

                  const father = people
                    .find(p => p.name === person.fatherName);

                  return (
                    <tr
                      data-cy="person"
                      className={classNames({
                        'has-background-warning': slug === person.slug,
                      })}
                    >
                      <td>
                        <Link
                          to={`/people/${person.slug}`}
                          className={classNames({
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
                        {mother
                          ? (
                            <Link to={`/people/${mother.slug}`} className="has-text-danger">
                              {person.motherName}
                            </Link>
                          ) : (
                            person.motherName || '-'
                          )}
                      </td>

                      <td>
                        {father
                          ? (
                            <Link to={`/people/${father.slug}`}>
                              {person.fatherName}
                            </Link>
                          ) : (
                            person.fatherName || '-'
                          )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
};
