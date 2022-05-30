import React, { useEffect, useState } from 'react';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPeople } from '../../Api/api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const getPeopleFromServer = async () => {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    };

    getPeopleFromServer();
  }, []);

  return (
    <PeopleTable people={people} />
  );
};
