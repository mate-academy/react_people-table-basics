
export async function getPeople() {
  try {
    const response = await fetch(
      `https://mate-academy.github.io/react_people-table/api/people.json`,
    );
    const result = await response.json();
    const people = result.map(person => ({
      ...person,
      mother: result
        .find(human => person.motherName === human.name) || '-',
      father: result
        .find(human => person.fatherName === human.name) || '-',
    }));

    return people;
  } catch (e) {
    return Promise.reject(e);
  }
}
