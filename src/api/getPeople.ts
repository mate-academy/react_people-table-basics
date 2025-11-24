import { Person } from '../types';

export async function getPeople(): Promise<Person[]> {
  try {
    const personsResponse = await fetch(
      'https://mate-academy.github.io/react_people-table/api/people.json',
    );

    if (!personsResponse.ok) {
      throw new Error();
    }

    const persons: Person[] = await personsResponse.json();

    return persons;
  } catch {
    throw new Error('Failed to fetch people');
  }
}
