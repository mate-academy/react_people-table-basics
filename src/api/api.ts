const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export async function fetchPeople() {
  try {
    const result = await fetch(URL);

    if (!result.ok) {
      throw new Error(`Something went wrong ${result.status}`);
    }

    const data = await result.json();

    return data;
  } catch (error) {
    return error;
  }
}
