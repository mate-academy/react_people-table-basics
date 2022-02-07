import { Person } from '../types/Person/Person';

const getParent = (
  arr:Person[],
  person: Person,
  key: keyof Person,
) => {
  const parent = arr.find(currentPerson => currentPerson.name === person[key]);

  return parent || null;
};

export const getPeople = () => {
  return fetch('https://mate-academy.github.io/react_people-table/api/people.json')
    .then(response => response.json())
    .then((people: Person[]) => people.map(person => {
      return {
        ...person,
        father: getParent(people, person, 'fatherName'),
        mother: getParent(people, person, 'motherName'),
      };
    }));
};
