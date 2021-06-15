export const getPeople = () => fetch(
  'https://mate-academy.github.io/react_people-table/api/people.json',
)
  .then(response => response.json())
  .then(response => response.map(({
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
  }) => ({
    name,
    sex,
    born,
    died,
    mother: response.find(person => person.name === motherName) || '-',
    father: response.find(person => person.name === fatherName) || '-',
  })));
