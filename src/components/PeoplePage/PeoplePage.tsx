import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/people';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const requestPeopple = async () => {
    const peopleFromServer = await getPeople();

    setPeople(peopleFromServer);
  };

  useEffect(() => {
    requestPeopple();
  }, []);

  const findFather = (fatherName: string) => {
    return people.find(person => person.name === fatherName);
  };

  const findMother = (motherName: string) => {
    return people.find(person => person.name === motherName);
  };

  const peopleWithParents: PersonWithParents[] = people
    .map(person => ({
      ...person,
      father: findFather(person.fatherName) || null,
      mother: findMother(person.motherName) || null,
    }));

  return (
    <>
      <h1 className="title">People page</h1>
      <PeopleTable people={peopleWithParents} />
    </>
  );
};
