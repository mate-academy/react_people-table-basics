import { Loader } from '../components/Loader';
import { useState, useEffect } from 'react';
import { PeopleTable } from '../components/Loader/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = ({ title }: { title: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [userData, setUserData] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(data => setUserData(data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">{title}</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {!isLoading && !isError && userData.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !isError && userData.length > 0 && (
            <PeopleTable usersData={userData} />
          )}
        </div>
      </div>
    </>
  );
};
