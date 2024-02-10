/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const linkPeople = (peopleList: Person[]): Person[] => {
    const peopleListClone = [...peopleList];

    for (const person of peopleListClone) {
      person.mother = peopleList
        .find(element => element.name === person.motherName);
      person.father = peopleList
        .find(element => element.name === person.fatherName);
    }

    return peopleListClone;
  };

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(peopleFromServer => {
        setPeople(linkPeople(peopleFromServer));
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {(!isLoading && !error && people && people.length === 0) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
          {people && (
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
                {people?.map(person => (
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={classNames(
                      { 'has-background-warning active': slug === person.slug },
                    )}
                  >
                    <td>
                      <NavLink
                        to={`/people/${person.slug}`}
                        className={classNames({ 'has-text-danger': person.sex === 'f' })}
                      >
                        <PersonLink person={person} />
                      </NavLink>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.mother ? (
                        <Link
                          to={`/people/${person.mother.slug}`}
                          className="has-text-danger"
                        >
                          {person.mother && <PersonLink person={person.mother} />}
                        </Link>
                      ) : person.motherName ? person.motherName : '-'}

                    </td>
                    <td>
                      {person.father ? (
                        <Link to={`/people/${person.father.slug}`}>
                          {person.father && <PersonLink person={person.father} />}
                        </Link>
                      ) : person.fatherName ? person.fatherName : '-'}

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </>
  );
};
