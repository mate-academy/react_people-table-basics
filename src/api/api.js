export async function getPeople() {
  const response = await fetch(
    `https://mate-academy.github.io/react_people-table/api/people.json`,
  );
  const parsedResponse = await response.json();
  const peopleList = parsedResponse.map(person => ({
    ...person,
    mother: parsedResponse
      .find(human => person.motherName === human.name) || '-',
    father: parsedResponse
      .find(human => person.fatherName === human.name) || '-',
  }));

  return peopleList;
}
