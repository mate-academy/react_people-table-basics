export async function getPeople() {
  // eslint-disable-next-line max-len
  const promis = await fetch('https://mate-academy.github.io/react_people-table/api/people.json');

  const result = await promis.json();

  return result;
}
