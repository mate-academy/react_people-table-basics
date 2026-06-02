import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonLink } from '../components/PersonLink/PersonLink';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

export function PeoplePage() {
  const [users, setUsers] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(setUsers)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  function getPersonSlug(userName: string | null) {
    return users.find(person => person.name === userName)?.slug;
  }

  const { slug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading === true && <Loader />}

          {!loading && error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !error && users.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {!loading && !error && users.length > 0 && (
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
                {users.map(user => {
                  const motherSlug = getPersonSlug(user.motherName);
                  const fatherSlug = getPersonSlug(user.fatherName);

                  return (
                    <tr
                      data-cy="person"
                      key={user.slug}
                      className={cn({
                        'has-background-warning': user.slug === slug,
                      })}
                    >
                      <td>
                        <PersonLink
                          name={user.name}
                          slug={user.slug}
                          isRed={user.sex === 'f'}
                        />
                      </td>

                      <td>{user.sex}</td>
                      <td>{user.born}</td>
                      <td>{user.died}</td>
                      <td>
                        {user.motherName === null ? (
                          '-'
                        ) : (
                          <PersonLink
                            name={user.motherName}
                            slug={motherSlug}
                            isRed={true}
                          />
                        )}
                      </td>
                      <td>
                        {user.fatherName === null ? (
                          '-'
                        ) : (
                          <PersonLink
                            name={user.fatherName}
                            slug={fatherSlug}
                            isRed={false}
                          />
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
    </>
  );
}
