import { useEffect, useState } from 'react';
import { getPeople } from '../api/api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeolpe] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const loadingPeole = async () => {
      const peopleFromServer = await getPeople();

      setPeolpe(peopleFromServer);
      setLoading(true);
    };

    loadingPeole();
  }, []);

  return (
    <>
      <h1>People Page</h1>
      {isLoading ? (
        <PeopleTable people={people} />
      ) : (
        <Loader />
      )}
    </>
  );
};
