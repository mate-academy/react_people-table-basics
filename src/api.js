function getPeople() {
  const request = fetch('https://mate-academy.github.io/react_people-table/api/people.json')
    .then(response => response.json());

  return request;
}

export async function getPeopleWithParents() {
  const allPeople = await getPeople();

  const peopleWithParents = allPeople
    .map(person => ({
      ...person,
      mother: allPeople.find(mother => person.motherName === mother.name),
      father: allPeople.find(father => person.fatherName === father.name),
    }));

  return peopleWithParents;
}
