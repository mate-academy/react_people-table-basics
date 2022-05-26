import React, { useEffect, useState } from 'react';
import { getPeopleFromServer } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import './PeoplePage.scss';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<People[] | null>([]);

  const getPeople = async () => {
    const peopleFromServer = await getPeopleFromServer();

    setPeople(peopleFromServer);
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div>
      <h1 className="peoplePage-title">People Page</h1>

      {people ? (
        <PeopleTable people={people} />
      ) : (
        <div>
          Loading...
        </div>
      )}
    </div>
  );
};
