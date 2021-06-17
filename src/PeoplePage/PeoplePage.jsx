import React, { useState, useEffect } from 'react';

import { getPeople } from '../api/api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(res => setPeople(res));
  }, []);

  return (
    <>
      <h1 className="title is-1">People page</h1>
      <PeopleTable people={people} />
    </>
  );
};
