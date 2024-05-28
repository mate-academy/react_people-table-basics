import { useEffect, useState } from 'react';

import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import PeopleTable from '../components/PeopleTable';
import { Person } from '../types';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchPeople = async () => {
    setIsLoading(true);
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <PeopleTable people={people} isError={isError} />
      )}
    </>
  );
};

export default PeoplePage;
