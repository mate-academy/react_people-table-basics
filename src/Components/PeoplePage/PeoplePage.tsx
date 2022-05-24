import { FC, useEffect, useState } from 'react';
import { getPeople } from '../../API/api';
import { Loader } from '../Loader/Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<PeopleType[] | null>(null);

  useEffect(() => {
    const getPeopleFromServer = async () => {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    };

    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1>People page</h1>

      {people ? <PeopleTable people={people} /> : <Loader />}
    </>
  );
};
