import React, { useState, useEffect } from 'react';
import { getPeople } from './api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage:React.FC = () => {
  const [peoples, setPeoples] = useState<People[]>([]);

  const getPeopleFromServer = async () => {
    await getPeople()
      .then(response => setPeoples(response.map((person:People) => {
        const mother = response
          .find((item:People) => person.motherName === item.name);
        const father = response
          .find((item:People) => person.fatherName === item.name);

        return { ...person, mother, father };
      })));
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1>People page</h1>
      <PeopleTable peoples={peoples} />
    </>
  );
};
