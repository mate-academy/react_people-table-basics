import React, { useState, useEffect } from 'react';

import { getPeople } from '../../../api/fetch';
import { PeopleTable } from '../../4_PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState([]);

  const loading = async () => {
    const peopleFromServer = await getPeople();

    setPeople(peopleFromServer);
  };

  useEffect(() => {
    loading();
  }, []);

  return (
    <>
      <h1>People Page</h1>

      {people.length > 0 && (
        <PeopleTable people={people} />
      )}
    </>
  );
};
