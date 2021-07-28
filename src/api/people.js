export const getPeople = () => (
  fetch('react_people-table-basics/blob/gh-pages/api/people.json')
    .then(response => response.json())
    .then(persons => persons.map(person => ({
      ...person,
      mother: persons
        .find(individual => person.motherName === individual.name),
      father: persons
        .find(individual => person.fatherName === individual.name),
    })))
);
