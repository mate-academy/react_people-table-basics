import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { useState } from 'react';
import { useEffect } from 'react';

import { Person } from '../../types';
import classNames from 'classnames';
import { useParams, Link } from 'react-router-dom';

const createPerson = (list: Person[]) => {
  return list.map((completePerson, index, arr) => {
    let finalPerson = {
      ...completePerson,
    };

    if (completePerson.fatherName) {
      finalPerson = {
        ...finalPerson,
        father: arr.filter(
          (parentPerson: Person) =>
            parentPerson.name === completePerson.fatherName,
        )[0],
      };
    }

    if (completePerson.motherName) {
      finalPerson = {
        ...finalPerson,
        mother: arr.filter(
          (parentPerson: Person) =>
            parentPerson.name === completePerson.motherName,
        )[0],
      };
    }

    return finalPerson;
  });
};

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { personId } = useParams();

  useEffect(() => {
    getPeople()
      .then(response => {
        setPeopleList(createPerson(response));
        setIsError(false);
      })
      .catch(error => {
        setIsError(true);
        throw new Error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {isError ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : (
                <>
                  {peopleList.length > 0 ? (
                    <table
                      data-cy="peopleTable"
                      className="table 
                      is-striped 
                      is-hoverable 
                      is-narrow 
                      is-fullwidth"
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
                        {peopleList.map(person => (
                          <tr
                            data-cy="person"
                            className={classNames({
                              'has-background-warning':
                                personId === person.slug,
                            })}
                            key={person.slug}
                          >
                            <td
                              className={classNames({
                                'has-text-danger': person.sex === 'f',
                              })}
                            >
                              <Link to={`/people/${person.slug}`}>
                                {person.name}
                              </Link>
                            </td>

                            <td>{person.sex}</td>
                            <td>{person.born}</td>
                            <td>{person.died}</td>
                            <td>
                              {!person.motherName ? (
                                '-'
                              ) : person.mother === undefined ? (
                                person.motherName
                              ) : (
                                <Link
                                  className="has-text-danger"
                                  to={`/people/${person.mother.slug}`}
                                >
                                  {person.mother.name}
                                </Link>
                              )}
                            </td>
                            <td>
                              {!person.fatherName ? (
                                '-'
                              ) : person.father === undefined ? (
                                person.fatherName
                              ) : (
                                <Link to={`/people/${person.father.slug}`}>
                                  {person.father.name}
                                </Link>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
