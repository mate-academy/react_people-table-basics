// eslint-disable-next-line
const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = () => fetch(BASE_URL)
  .then(result => result.json())
  .then(people => people.map(person => ({
    ...person,
    father: person.fatherName,
    mother: person.motherName,
  })));
