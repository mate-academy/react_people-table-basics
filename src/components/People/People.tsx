import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from '../Loader/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from '../Person/Person';

export const People: React.FC = () => {
  const [listPeople, setListPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const { slug = '' } = useParams();

  useEffect(() => {
    getPeople()
      .then((res: Person[]) => setListPeople(res))
      .catch(() => setError(true));
  }, []);

  const getParent = (person: Person) => {
    return listPeople
      .find(
        (el: Person) => el.name === person.fatherName,
      );
  };

  const isActive = (name: string) => {
    return slug.replaceAll('-', ' ').toLowerCase().includes(name.toLowerCase());
  };

  const emptyName = (person: Person) => {
    return person.motherName || '-';
  };

  const createSlug = (name: string) => {
    const parent = listPeople.filter((el: Person) => el.name === name)[0];

    return parent
      ? `/people/${parent.name.replaceAll(' ', '-')}-${parent.born}`
      : '';
  };

  return (
    <div className="block">
      <h2 className="title">People Page</h2>
      <div className="box table-container">
        {!listPeople.length && !error
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

              {listPeople.length
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
                          className={classNames({
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
                            {getParent(person) ? (
                              <Link
                                className="has-text-danger"
                                to={
                                  createSlug(
                                    person.motherName as string,
                                  )
                                }
                              >
                                {person.motherName}
                              </Link>
                            ) : emptyName(person)}

                          </td>
                          <td>
                            {getParent(person) ? (
                              <Link to={
                                createSlug(
                                  person.fatherName as string,
                                )
                              }
                              >
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
