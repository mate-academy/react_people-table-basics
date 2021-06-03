import React, { useEffect, useState } from 'react';
import { getPeople } from '../api/people';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        const correctPeople = peopleFromServer.map((person) => {
          const personWithParents = {
            ...person,
            mother: peopleFromServer.find(
              mother => mother.name === person.motherName,
            ),
            father: peopleFromServer.find(
              father => father.name === person.fatherName,
            ),
          };

          return personWithParents;
        });

        setPeople(correctPeople);
      });
  }, []);

  return (
    <>
      <h2 className="subtitle">People page</h2>
      <PeopleTable people={people} />
    </>
  );
};
