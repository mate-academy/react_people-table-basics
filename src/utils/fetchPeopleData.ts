export async function fetchPeopleData() {
  try {
    const response = await fetch(
      'https://mate-academy.github.io/react_people-table/api/people.json',
    );
    const data = await response.json();

    return data;
  } catch {
    throw new Error('Failed to fetch people data.');
  }
}
