import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Human[ ] | null>(null);

  const getPeopleFromServer = async () => {
    const peopleFromServer = await getPeople();

    setPeople(peopleFromServer);
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="PageTitle">List of people</h1>
      {people
        && (
          <PeopleTable
            people={people}
          />
        )}
    </>
  );
};
