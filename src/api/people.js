export const getPeople = () => (
  // eslint-disable-next-line
  fetch('https://Artem20201610.github.io/react_people-table-basics/api/people.json')
    .then(response => response.json())
    .then(persons => persons.map(person => ({
      ...person,
      mother: persons
        .find(individual => person.motherName === individual.name),
      father: persons
        .find(individual => person.fatherName === individual.name),
    })))
);
