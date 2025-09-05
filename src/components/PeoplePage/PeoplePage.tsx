import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from '../PersonLink/PersonLink';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingError, setLoadingError] = useState(false);
  const [peopleOnLoading, setPeopleOnLoading] = useState(false);

  useEffect(() => {
    const loadingPeople = async () => {
      try {
        setPeopleOnLoading(true);

        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch (err) {
        setLoadingError(true);
      } finally {
        setPeopleOnLoading(false);
      }
    };

    loadingPeople();
  }, []);

  const { slug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {peopleOnLoading && <Loader />}

          {loadingError && !peopleOnLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0 && !loadingError && !peopleOnLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length > 0 && !loadingError && !peopleOnLoading && (
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
                {people.map(person => (
                  <tr
                    data-cy="person"
                    key={person.slug}
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
                      {person.motherName ? (
                        <PersonLink
                          personName={person.motherName}
                          allPeople={people}
                        />
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>
                      {person.fatherName ? (
                        <PersonLink
                          personName={person.fatherName}
                          allPeople={people}
                        />
                      ) : (
                        '-'
                      )}
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
