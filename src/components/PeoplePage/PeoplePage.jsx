import React, { useState, useEffect } from 'react';

import { getPeople } from '../../api/api';

import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  return (
    <div>
      <h2>People table</h2>
      <PeopleTable
        people={people}
      />
    </div>
  );
};
