import React, { useEffect, useState } from 'react';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(receivedPeople => {
        setPeople(receivedPeople);
        setIsLoading(false);
      })
      .catch(() => setErrorMessage('Something went wrong'));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <PeopleTable
          people={people}
          errorMessage={errorMessage}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};
