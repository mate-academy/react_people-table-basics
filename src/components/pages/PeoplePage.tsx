import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { slug: selectedSlug } = useParams<{ slug?: string }>();

  const fetchPeople = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getPeople();

      setPeople(data);
    } catch {
      setError('Failed to get people');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : error ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : people?.length === 0 ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
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
                    className={classNames({
                      'has-background-warning': person.slug === selectedSlug,
                    })}
                  >
                    <td>
                      <PersonLink
                        person={person}
                        name={person.name}
                      ></PersonLink>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.motherName ? (
                        <PersonLink
                          person={people.find(
                            p => p.name === person.motherName,
                          )}
                          name={person.motherName}
                        />
                      ) : (
                        '-'
                      )}
                    </td>

                    <td>
                      {person.fatherName ? (
                        <PersonLink
                          person={people.find(
                            p => p.name === person.fatherName,
                          )}
                          name={person.fatherName}
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
