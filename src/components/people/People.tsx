import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonLink } from '../person/Person';

export const People: React.FC = () => {
  const [listPeople, setListPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const { slug = '' } = useParams();

  useEffect(() => {
    getPeople()
      .then((res: Person[]) => setListPeople(res))
      .catch(() => setError(true));
  }, []);

  const parent = (person:Person) => {
    return listPeople
      .filter(
        (el: Person) => el.name === person.fatherName
          || el.name === person.fatherName,
      ).length;
  };

  const isActive = (name: string) => {
    return slug.replaceAll('-', ' ').includes(name.toLowerCase());
  };

  const emptyName = (person:Person) => {
    return person.motherName ? person.motherName : '-';
  };

  return (
    <div className="block">
      <h2 className="title">People Page</h2>
      <div className="box table-container">
        {listPeople.length < 1 && !error
          ? <Loader />
          : (
            <>
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!error && !listPeople.length
                    && (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}

              {listPeople.length > 0
                            && (
                              <table
                                data-cy="peopleTable"
                                className="
                    table is-striped
                    is-hoverable is-narrow is-fullwidth"
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
                                  {listPeople.map((person: Person) => (
                                    <tr
                                      data-cy="person"
                                      className={classNames('', {
                                        'has-background-warning':
                                            isActive(person.name),
                                      })}
                                      key={person.slug}
                                    >
                                      <PersonLink person={person} />

                                      <td>{person.sex}</td>
                                      <td>{person.born}</td>
                                      <td>{person.died}</td>
                                      <td>
                                        {parent(person) ? (
                                          <Link
                                            className="has-text-danger"
                                            to={`/people/${person.slug}`}
                                          >
                                            {person.motherName}
                                          </Link>
                                        ) : emptyName(person)}

                                      </td>
                                      <td>
                                        {parent(person) ? (
                                          <Link to={`/people/${person.slug}`}>
                                            {person.fatherName}
                                          </Link>
                                        ) : emptyName(person)}

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
  );
};
