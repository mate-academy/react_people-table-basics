import React, { useEffect, useState } from 'react';
import { getPeople } from '../api/people';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  return (
    <>
      <h1 className="title">Table Page</h1>
      {people.length && <PeopleTable people={people} />}
    </>
  );
};
