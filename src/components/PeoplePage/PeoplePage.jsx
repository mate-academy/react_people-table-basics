import React, { useEffect, useState } from 'react';

import { getPeople } from '../../api/api';

import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  return (
    <>
      <h1>
        People page
      </h1>
      <PeopleTable people={people} />
    </>
  );
};
