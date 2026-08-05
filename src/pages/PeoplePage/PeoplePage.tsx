import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Loader } from '../../components/Loader/Loader';
import { PersonLink } from '../../components/PersonLink/PersonLink';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';

const findPerson = (
  people: Person[],
  name: string | null,
  personObj?: Person,
): Person | null => {
  if (!name && !personObj) {
    return null;
  }

  return (
    people.find(
      p => p.name === name || (personObj && p.slug === personObj.slug),
    ) || null
  );
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && error.length > 0 && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {people.length === 0 && !loading && !error && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !error && people.length > 0 && (
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
                  const motherName =
                    person.motherName || person.mother?.name || null;
                  const fatherName =
                    person.fatherName || person.father?.name || null;

                  const mother = findPerson(people, motherName, person.mother);
                  const father = findPerson(people, fatherName, person.father);

                  return (
                    <tr
                      data-cy="person"
                      key={person.slug}
                      className={classNames({
                        'has-background-warning': slug === person.slug,
                      })}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {mother ? (
                          <PersonLink person={mother} />
                        ) : (
                          motherName || '-'
                        )}
                      </td>
                      <td>
                        {father ? (
                          <PersonLink person={father} />
                        ) : (
                          fatherName || '-'
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
