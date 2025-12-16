import { Person } from '../types';
import { wait } from '../utils/http';

export const getPeopleFromServer = async (): Promise<Person[]> => {
  await wait(400);
  const response = await fetch(
    'https://mate-academy.github.io/react_people-table/api/people.json',
  );

  if (!response.ok) {
    throw new Error('Network error');
  }

  return response.json();
};

export const getPeopleWithParents = (peopleFromServer: Person[]) => {
  const peopleMap = new Map<string, Person>();

  peopleFromServer.forEach(person => {
    peopleMap.set(person.name, person);
  });

  const peopleWithParents = peopleFromServer.map(person => ({
    ...person,
    father: person.fatherName ? peopleMap.get(person.fatherName) : undefined,
    mother: person.motherName ? peopleMap.get(person.motherName) : undefined,
  }));

  return peopleWithParents;
};
