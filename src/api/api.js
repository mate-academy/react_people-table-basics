export const getPeople = () => (
  fetch(`https://mate-academy.github.io/react_people-table/api/people.json`)
    .then(response => response.json())
    .then(people => people.map((person, i, arr) => ({
      ...person,
      mother: arr.find(mother => mother.name === person.motherName),
      father: arr.find(father => father.name === person.fatherName),
    })))
);
