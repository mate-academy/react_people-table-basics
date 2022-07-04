import { useEffect, useState } from 'react';
import { getPeople } from '../api/api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<People[]>([]);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer));
  }, []);

  const peopleWithParents = people.map(child => {
    const childWithParents = {
      ...child,
      mother: people.find(parent => parent.name === child.motherName),
      father: people.find(parent => parent.name === child.fatherName),
    };

    return childWithParents;
  });

  return (
    <>
      <h1>People page</h1>
      <PeopleTable people={peopleWithParents} />
    </>
  );
};
