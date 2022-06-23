import React, { useEffect, useState } from 'react';
import { getPeopleFromAPI } from '../../api/getPeopleFromAPI';
import { PeopleTable } from '../PeopleTable';

export const People: React.FC = () => {
  const [people, setPeople] = useState<PeopleWithParrents[] | null>(null);

  const GetPeople = () => {
    getPeopleFromAPI()
      .then(result => {
        const peopleWithParrents: PeopleWithParrents[] = result.map(person => ({
          ...person,
          father: result
            .find((father: People) => father.name === person.fatherName)
            || null,
          mother: result
            .find((mother: People) => mother.name === person.motherName)
            || null,
        }));

        setPeople(peopleWithParrents);
      });
  };

  useEffect(() => {
    GetPeople();
  }, []);

  // console.log(people);

  return (
    <>
      <h1>People page</h1>

      {people && <PeopleTable people={people} />}
    </>
  );
};
