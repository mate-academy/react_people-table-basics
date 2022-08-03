import { useEffect, useState } from 'react';
import { getPeople } from '../api/api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const loadingPeole = async () => {
      const peopleFromServer = await getPeople();

      setLoading(true);
      setPeople(peopleFromServer);
    };

    loadingPeole();
  }, []);

  return (
    <>
      <h1>People Page</h1>
      {!isLoading ? (
        <Loader />
      ) : (
        <PeopleTable people={people} />
      )}
    </>
  );
};
