import { useEffect, useState } from 'react';
import { getPeople } from '../api/api';
import { PeopleTable } from './PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<PersonWithParents[] | []>([]);

  const getNewPerson = () => {
    getPeople().then(res => {
      const newPersonWithParents:PersonWithParents[] = res.map(
        (person:Person) => ({
          ...person,
          father: res.find(
            (parent:Person) => parent.name === person.fatherName,
          ) || null,
          mother: res.find(
            (parent:Person) => parent.name === person.motherName,
          ) || null,
        }),
      );

      setPeople(newPersonWithParents);
    });
  };

  useEffect(() => {
    getNewPerson();
  }, []);

  return (
    <>
      <PeopleTable
        people={people}
      />
    </>
  );
};
