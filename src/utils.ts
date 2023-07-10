import { Person } from './types';

// const getMother = (name: string | null) => {
//   // if(name) {

//   // }
// }

export const getPreparedPeople = (people: Person[]) => {
  people.map(person => {
    return {
      ...person,
      mother: people
        .find(person1 => person1.name === person.motherName) || null,
      father: people
        .find(person1 => person1.name === person.fatherName) || null,
    };
  });
};
