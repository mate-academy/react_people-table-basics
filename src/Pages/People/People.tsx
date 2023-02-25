import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPeople = async () => {
    try {
      setIsLoading(true);
      const newPeople = await getPeople();

      setPeople(newPeople);
      setIsSuccess(true);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      setIsSuccess(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable
        people={people}
        isSuccess={isSuccess}
        isLoading={isLoading}
      />
    </>
  );
};
