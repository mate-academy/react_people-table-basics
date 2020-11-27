import React, { useEffect, useState } from 'react';
import { getPeople } from '../api/people';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const getPeopleFromServer = async() => {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    };

    getPeopleFromServer();
  }, [people]);

  return (
    <>
      <h2>People Page</h2>
      <PeopleTable people={people} />
    </>
  );
};
