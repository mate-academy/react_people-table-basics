import { Person } from '../types';

export const preparePeopleArray = (people: Person[]) => {
  const preparedPeople = people.map(person => {
    const mother = people.find(mom => mom.name === person.motherName);

    const father = people.find(dad => dad.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });

  return preparedPeople;
};
