import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Link, useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    if (people.length === 0) {
      setLoading(true);
      getPeople()
        .then(data => {
          setPeople(data);
        })
        .catch(() => {
          setError('Something went wrong');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [people.length]);

  const namesSet = new Set(people.map(person => person.name));

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {!error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length > 0 && (
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
                    className={
                      person.slug === slug ? 'has-background-warning' : ''
                    }
                  >
                    <td>
                      <Link
                        to={`/people/${person.slug}`}
                        className={person.sex === 'f' ? 'has-text-danger' : ''}
                      >
                        {person.name}
                      </Link>
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td
                      className={
                        namesSet.has(person.motherName || '')
                          ? 'has-text-danger'
                          : ''
                      }
                    >
                      {person.motherName ? (
                        namesSet.has(person.motherName) ? (
                          <Link
                            to={`/people/${people.find(p => p.name === person.motherName)?.slug}`}
                            className="has-text-danger"
                          >
                            {person.motherName}
                          </Link>
                        ) : (
                          person.motherName
                        )
                      ) : (
                        '-'
                      )}
                    </td>
                    <td
                      className={
                        namesSet.has(person.fatherName || '')
                          ? 'has-text-danger'
                          : ''
                      }
                    >
                      {person.fatherName ? (
                        namesSet.has(person.fatherName) ? (
                          <Link
                            to={`/people/${people.find(p => p.name === person.fatherName)?.slug}`}
                          >
                            {person.fatherName}
                          </Link>
                        ) : (
                          person.fatherName
                        )
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
