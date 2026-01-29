import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/Loader/PeopleTable';

export type User = {
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

  useEffect(() => {
    setLoading(true);

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
      .catch(() => {
        setError(true);
        setUsers([]);
      })
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

            {!loading && users !== undefined && users.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!loading && users && users?.length > 0 && !error && (
              <PeopleTable users={users} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
