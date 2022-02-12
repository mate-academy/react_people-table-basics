import React, { useState, useEffect } from 'react';
import { getPeople } from 'api/people';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    };

    fetchData();
  }, []);

  return (
    <div className="columns">
      <div className="column">
        <h1 className="title">People page</h1>

        <PeopleTable people={people} />
      </div>
    </div>
  );
};
