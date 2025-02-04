import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const { personID } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(responses => {
        setPeople(responses);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const findPerson = (name: string): Person | undefined => {
    return people.find(person => person.name === name);
  };

  const renderPersonLink = (name: string) => {
    const person = findPerson(name);

    if (person) {
      return (
        <a
          href={`#/people/${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {name}
        </a>
      );
    }

    return name;
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {' '}
        Something went wrong{' '}
      </p>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {people.length ? (
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
                  const {
                    slug,
                    name,
                    sex,
                    born,
                    died,
                    fatherName,
                    motherName,
                  } = person;

                  return (
                    <tr
                      data-cy="person"
                      key={slug}
                      className={classNames({
                        'has-background-warning': personID === slug,
                      })}
                    >
                      <td>
                        <a
                          href={`#/people/${slug}`}
                          className={classNames({
                            'has-text-danger': sex === 'f',
                          })}
                        >
                          {name}
                        </a>
                      </td>

                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>
                      <td>{motherName ? renderPersonLink(motherName) : '-'}</td>
                      <td>{fatherName ? renderPersonLink(fatherName) : '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
};
