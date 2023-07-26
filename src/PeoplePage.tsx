import { useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import { getPeople } from './api';
import { Person } from './types';
import { PersonLink } from './PersonLink';

export const PeoplePage = () => {
  const [users, setUsers] = useState<Person[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const fetchData = async () => {
        const usersFromServer = await getPeople();

        const usersWithParents = usersFromServer.map(user => ({
          ...user,
          mother: usersFromServer.find(
            findUser => user.motherName === findUser.name || null,
          ),
          father: usersFromServer.find(
            findUser => user.fatherName === findUser.name || null,
          ),
        }));

        setUsers(usersWithParents);
      };

      fetchData();
    } catch (requestError) {
      setError('Something Went Wrong');
      throw new Error(`Failed to fetch data: ${requestError}`);
    }
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {!users && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {users && !users.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {users && (
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
                {users.map((user) => (
                  <>
                    <PersonLink user={user} key={user.slug} />
                  </>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
