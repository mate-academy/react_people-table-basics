/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import {
  useParams, Link,
} from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';
import { NoPeople } from './NoPeople';

export const PeoplePage = () => {
  const { peopleSlug } = useParams();
  const [fetchedPeople, setFetchedPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then((data) => {
        setFetchedPeople(data);
        setError(null);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const getPersonSlugByName = (people: Person[], name: string | null) => {
    const person = people.find((p: Person) => p.name === name);

    return person ? person.slug : '';
  };

  if (error) {
    return (
      <div className="block">
        <div className="box table-container">
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
        </div>
      </div>
    );
  }
  // {fetchedPeople.length === 0 ? (
  //   <NoPeople />
  // ) : (
  //   <>
  //     {loading ? (
  //       <Loader />
  //     ) : (

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {fetchedPeople.length === 0 ? (
            <NoPeople />
          ) : (
            <>
              <h1 className="title">People Page</h1>

              <div className="block">
                <div className="box table-container">
                  <table
                    data-cy="peopleTable"
                    className="
                      table is-striped
                      is-hoverable
                      is-narrow is-fullwidth
                    "
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
                      {fetchedPeople.map((person: Person) => (
                        <tr
                          key={person.slug}
                          data-cy="person"
                          className={cn({
                            'has-background-warning':
                            person.slug === peopleSlug,
                          })}
                        >
                          <td>
                            <PersonLink person={person} />
                          </td>

                          <td>{person.sex}</td>
                          <td>{person.born}</td>
                          <td>{person.died}</td>
                          <td>
                            {fetchedPeople
                              .find(p => p.name === person.motherName) ? (
                                <Link
                                  to={`./${getPersonSlugByName(fetchedPeople, person.motherName)}`}
                                  className="has-text-danger"
                                >
                                  {person.motherName}
                                </Link>
                              ) : (
                                <span>
                                  {person.motherName || '-'}
                                </span>
                              )}
                          </td>
                          <td>
                            {fetchedPeople
                              .find(p => p.name === person.fatherName) ? (
                                <Link
                                  to={`./${getPersonSlugByName(fetchedPeople, person.fatherName)}`}
                                >
                                  {person.fatherName}
                                </Link>
                              ) : (
                                <span>
                                  {person.fatherName || '-'}
                                </span>
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
      )}
    </>
  );
};
