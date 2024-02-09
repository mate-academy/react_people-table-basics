/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const personName = people.map(person => person.name);

  const findSlug = (clickedPerson: string) => {
    return people.find(person => person.name === clickedPerson)?.slug;
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(!people || people.length === 0) && !isLoading && !errorMessage && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
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
                  return (
                    <>
                      <tr
                        data-cy="person"
                        className={classNames({
                          'has-background-warning': person.slug === slug,
                        })}
                      >
                        <td>
                          <Link
                            to={`../${person.slug}`}
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
                        {person.motherName
                          && personName.includes(person.motherName)
                          ? (
                            <td>
                              <Link
                                to={`../${findSlug(person.motherName)}`}
                                className="has-text-danger"
                              >
                                {person.motherName}
                              </Link>
                            </td>
                          ) : (
                            <td>{person.motherName || '-'}</td>
                          )}

                        {person.fatherName
                          && personName.includes(person.fatherName)
                          ? (
                            <td>
                              <Link
                                to={`../${findSlug(person.fatherName)}`}
                              >
                                {person.fatherName}
                              </Link>
                            </td>
                          ) : (
                            <td>{person.fatherName || '-'}</td>
                          )}
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
