import { useEffect, useState } from 'react';
import { getPeople } from '../api/people';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { FullPerson, Person } from '../types/Person';

const findParent = (
  child: Person,
  arrayOfPeople: Person[],
  sexOfParent: 'f' | 'm',
) => {
  const foundParent = arrayOfPeople.find(potentialParent => {
    switch (sexOfParent) {
      case 'f':
        return potentialParent.name === child.motherName;
      case 'm':
        return potentialParent.name === child.fatherName;
      default:
        return null;
    }
  });

  return foundParent || null;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<FullPerson[]>([]);

  const preparePeople = (arrOfPeople: Person[]): FullPerson[] => {
    return arrOfPeople.map(person => ({
      ...person,
      mother: findParent(person, arrOfPeople, 'f'),
      father: findParent(person, arrOfPeople, 'm'),
    }));
  };

  useEffect(() => {
    getPeople().then(loadedPeople => setPeople(preparePeople(loadedPeople)));
  }, []);

  // eslint-disable-next-line no-console
  console.log(people);

  return (
    <>
      <h1 className="title">People page</h1>
      <PeopleTable people={people} />
    </>
  );
};
