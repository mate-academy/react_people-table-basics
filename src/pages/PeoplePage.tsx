import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Link, NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

type User = {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
};

export const PeoplePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }

        return response.json();
      })
      .then(usersFromServer => {
        setUsers(usersFromServer);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {loading && <Loader />}

            {!loading && error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!loading && users?.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!loading && users && users?.length > 0 && !error && (
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
                  {users?.map(user => {
                    const mother = users.find(
                      person => person.name === user.motherName,
                    );

                    const motherSlug = mother
                      ? `/people/${mother?.slug}`
                      : null;

                    const father = users.find(
                      person => person.name === user.fatherName,
                    );

                    const fatherSlug = father
                      ? `/people/${father?.slug}`
                      : null;

                    return (
                      <tr
                        data-cy="person"
                        key={user.slug}
                        className={classNames({
                          'has-background-warning': slug === user.slug,
                        })}
                      >
                        <td>
                          <NavLink
                            to={`/people/${user.slug}`}
                            className={classNames({
                              'has-text-danger': user.sex === 'f',
                            })}
                          >
                            {user.name}
                          </NavLink>
                        </td>

                        <td>{user.sex}</td>
                        <td>{user.born}</td>
                        <td>{user.died}</td>
                        <td>
                          {motherSlug ? (
                            <Link to={motherSlug} className="has-text-danger">
                              {user.motherName}
                            </Link>
                          ) : (
                            <>
                              {user.motherName ? (
                                <>{user.motherName}</>
                              ) : (
                                <>-</>
                              )}
                            </>
                          )}
                        </td>
                        <td>
                          {fatherSlug ? (
                            <Link to={fatherSlug}>{user.fatherName}</Link>
                          ) : (
                            <>
                              {user.fatherName ? (
                                <>{user.fatherName}</>
                              ) : (
                                <>-</>
                              )}
                            </>
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
    </main>
  );
};
