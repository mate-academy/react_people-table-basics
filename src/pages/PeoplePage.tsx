import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoadingPeople, setIsLoadingPeople] = useState(false);
  const [isPeopleLoadingError, setIsPeopleLoadingError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoadingPeople(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsPeopleLoadingError(true))
      .finally(() => setIsLoadingPeople(false));
  }, []);

  const peopleWithLinks = people.map(person => {
    function findMother(motherName: string | null) {
      return people.find(per => per.name === motherName);
    }

    function findFather(fatherName: string | null) {
      return people.find(per => per.name === fatherName);
    }

    return {
      ...person,
      mother: person.motherName ? findMother(person.motherName) : null,
      father: person.fatherName ? findFather(person.fatherName) : null,
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
              {isPeopleLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length === 0 && (
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
                  {peopleWithLinks.map(person => (
                    <tr
                      data-cy="person"
                      key={person.slug}
                      className={classNames({
                        'has-background-warning': person.slug === slug,
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
                        {!person.motherName && '-'}
                        {person.mother ? (
                          <Link
                            to={`/people/${person.mother?.slug}`}
                            className={classNames({
                              'has-text-danger': person.mother.sex === 'f',
                            })}
                          >
                            {person.motherName}
                          </Link>
                        ) : (
                          person.motherName
                        )}
                      </td>
                      <td>
                        {!person.fatherName && '-'}
                        {person.father ? (
                          <Link
                            to={`/people/${person.father?.slug}`}
                            className={classNames({
                              'has-text-danger': person.father.sex === 'f',
                            })}
                          >
                            {person.fatherName}
                          </Link>
                        ) : (
                          person.fatherName
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};
