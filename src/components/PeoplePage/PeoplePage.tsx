import React, { useEffect } from 'react';
import { getPeople } from '../../getPeople';
import { People } from '../../types/People';

export type Props = {
  loadPeople: (people: People[]) => void,
};

export function addParents(actualPeople: People[]) {
  return actualPeople.map(person => ({
    ...person,
    father: actualPeople
      .find(father => father.name === person.fatherName),
    mother: actualPeople
      .find(mother => mother.name === person.motherName),
  }));
}

export const PeoplePage: React.FC<Props> = ({ loadPeople }) => {
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPeople();

      loadPeople(addParents(data));
    };

    fetchData();
  }, []);

  return (
    <h1 className="title">People page</h1>
  );
};
