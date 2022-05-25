import { FC, useEffect, useState } from 'react';
import { getPeople } from '../../API/api';
import { Loader } from '../Loader/Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<PeopleType[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPeopleFromServer = async () => {
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch {
        setError('Cannot load data from server');
      }
    };

    getPeopleFromServer();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>People page</h1>

      {people ? <PeopleTable people={people} /> : <Loader />}
    </>
  );
};
