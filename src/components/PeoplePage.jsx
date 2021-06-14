import React, { useState, useEffect } from 'react';

import { getPeople } from '../api/people';

import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const peopleFromServer = await getPeople();
      const prepairedPeople = peopleFromServer.map(person => (
        {
          ...person,
          father: peopleFromServer.find(
            father => father.name === person.fatherName,
          ),
          mother: peopleFromServer.find(
            mother => mother.name === person.motherName,
          ),
        }
      ));

      setPeople(prepairedPeople);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>People Table</h1>
      <PeopleTable people={people} />
    </div>
  );
};
