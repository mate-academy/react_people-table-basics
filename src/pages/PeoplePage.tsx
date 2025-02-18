import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import React from 'react';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoadingPeople, setIsLoadingPeople] = useState(false);
  const [isLoadingPeopleError, setIsLoadingPeopleError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoadingPeople(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsLoadingPeopleError(true))
      .finally(() => setIsLoadingPeople(false));
  }, []);

  const peopleWithParents = people.map(person => {
    function getMotherName(motherName: string) {
      return people.find(per => per.name === motherName);
    }

    function getFatherName(fatherName: string) {
      return people.find(per => per.name === fatherName);
    }

    return {
      ...person,
      mother: person.motherName ? getMotherName(person.motherName) : null,
      father: person.fatherName ? getFatherName(person.fatherName) : null,
    };
  });

  return (
    <>
      {isLoadingPeople ? (
        <Loader />
      ) : (
        <>
          <h1 className="title">People Page</h1>

          <div className="block">
            <div className="box table-container">
              {isLoadingPeopleError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
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
                  {peopleWithParents.map(person => {
                    const isSlug = person.slug === slug;
                    const isDanger = person.sex === 'f';

                    return (
                      <tr
                        data-cy="person"
                        key={person.slug}
                        className={cn({
                          'has-background-warning': isSlug,
                        })}
                      >
                        <td>
                          <Link
                            to={`${person.slug}`}
                            className={cn({
                              'has-text-danger': isDanger,
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
                              to={`${person.mother.slug}`}
                              className="has-text-danger"
                            >
                              {person.motherName}
                            </Link>
                          ) : person.motherName ? (
                            person.motherName
                          ) : (
                            '-'
                          )}
                        </td>
                        <td>
                          {person.father ? (
                            <Link to={`${person.father.slug}`}>
                              {person.fatherName}
                            </Link>
                          ) : person.fatherName ? (
                            person.fatherName
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};
