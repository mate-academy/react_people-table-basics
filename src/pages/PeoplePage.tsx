import { useEffect, useState } from 'react';

import { Loader } from '../components/Loader';
import PeopleTable from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchPeople = async () => {
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

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
