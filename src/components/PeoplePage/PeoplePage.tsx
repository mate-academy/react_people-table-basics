import React, { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api/people';
import { PeopleTable } from '../PeopleTable';

interface Error {
  hasError: boolean;
  message: string;
}

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<Error>({
    hasError: false,
    message: '',
  });

  const getPeopleFromServer = async () => {
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch (e: any) {
      setError({
        hasError: true,
        message: e.message,
      });
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  if (error.hasError) {
    return (
      <p>{error.message}</p>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable people={people} />
    </>
  );
};
