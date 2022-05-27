import React, { useEffect, useState } from 'react';
import { getPeople } from './api/api';
import { PeopleTable } from './components/PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const getPeopleFromServer = async () => {
    const peopleFromServer = await getPeople();

    setPeople(peopleFromServer);
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      {people
        && (
          <PeopleTable
            people={people}
          />
        )}
    </>
  );
};
