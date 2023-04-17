import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserList } from './UserList';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { ErrorType } from '../Errors';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);

  const { slug = '' } = useParams();

  async function getUsersFromServer() {
    setIsLoading(true);
    try {
      const usersFromServer = await getPeople();

      setUsers(usersFromServer);
    } catch (error) {
      setErrorMessage(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setErrorMessage(false);
    getUsersFromServer();
    setTimeout(() => setErrorMessage(false), 3000);
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {ErrorType.UnableToLoad}
                </p>
              )}

              {users.length <= 0 && (
                <p data-cy="noPeopleMessage">{ErrorType.NoUsers}</p>
              )}

              <UserList users={users} personId={slug} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
