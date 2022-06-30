import React, { useEffect, useState } from 'react';
import { getPeopleApi } from '../../api/getPeopleAPI';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const People: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);

  const GetPeople = () => {
    getPeopleApi()
      .then(res => {
        const PeopleParrents: PeopleParrents[] = res.map(person => ({
          ...person,
          father: res
            .find((father: Person) => father.name === person.fatherName)
            || null,
          mother: res
            .find((mother: Person) => mother.name === person.motherName)
            || null,
        }));

        setPeople(PeopleParrents);
      });
  };

  useEffect(() => {
    GetPeople();
  }, []);

  return (
    <>
      <h1 className="subtitle is-3">People Page</h1>

      {people && <PeopleTable people={people} />}
    </>
  );
};
