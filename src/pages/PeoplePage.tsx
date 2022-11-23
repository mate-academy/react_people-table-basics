import React, { useCallback, useEffect, useState } from 'react';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { ErrorMassege } from '../types/ErrorMassege';
import { Error } from '../types/Error';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState<Error>({
    status: false,
    notification: ErrorMassege.None,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadPeople = useCallback(async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      if (peopleFromServer.length === 0) {
        setIsError({ status: true, notification: ErrorMassege.Empty });
      }

      setPeople([...peopleFromServer]);
    } catch {
      setIsError({ status: true, notification: ErrorMassege.Load });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleLoadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable
        people={people}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  );
};
