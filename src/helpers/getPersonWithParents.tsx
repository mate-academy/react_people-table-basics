import { Person } from '../types';

export const getPersonWithParents = (peopleFromServer: Person[]) => {
  return peopleFromServer.map(person => {
    const mother = peopleFromServer.find(
      mom => mom.name === person.motherName,
    );

    const father = peopleFromServer.find(
      dad => dad.name === person.motherName,
    );

    return {
      ...person,
      mother,
      father,
    };
  });
};
