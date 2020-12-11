export const BASE_URL
  = `https://mate-academy.github.io/react_people-table/api/people.json`;

export async function getPeople() {
  const response = await fetch(BASE_URL);
  const people = await response.json();

  // eslint-disable-next-line
  for (const person of people) {
    person.mother = people.find(mother => person.motherName === mother.name);

    person.father = people.find(father => person.fatherName === father.name);
  }

  return people;
}
