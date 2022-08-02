import React, { useEffect } from 'react';
import { getPeople } from '../../api/api';
import { Person, PersonFromServer } from '../../types/Person';
import { PeopleTable } from '../PeopleTable/PeopleTable';

type Props = {
  people: Person[],
  setPeople: (data: Person[]) => void;
};

export const PeoplePage: React.FC<Props> = ({ people, setPeople }) => {
  const peopleWithParentObj = (peopleArr: PersonFromServer[]): Person[] => {
    return peopleArr.map(person => {
      return {
        ...person,
        father: peopleArr.find(father => father.name === person.fatherName),
        mother: peopleArr.find(mother => mother.name === person.motherName),
      };
    });
  };

  useEffect(() => {
    getPeople()
      .then(data => setPeople(peopleWithParentObj(data)));
  }, []);

  return (
    <>
      <h1 className="title is-1">People page</h1>
      <PeopleTable people={people} />
    </>
  );
};
