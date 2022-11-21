import React, { useCallback, useEffect, useState } from 'react';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePeople = useCallback(async () => {
    setLoading(true);

    try {
      const peopleFromServer = await getPeople();

      setPeople([...peopleFromServer]);
      setLoading(false);
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handlePeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable
        people={people}
        loading={loading}
        isError={isError}
      />
    </>
  );
};
