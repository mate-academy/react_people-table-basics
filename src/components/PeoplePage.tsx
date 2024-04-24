import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsloading] = useState<boolean>(false);

  useEffect(() => {
    setIsloading(true);
    
    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);

        if (!peopleFromServer.length) {
          setErrorMessage('There are no people on the server');
        }
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => {
        setIsloading(false);
      });
  }, []);
  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable
        people={people}
        errorMessage={errorMessage}
        isLoading={isLoading}
      />
    </>
  );
};
