export interface Person {
  id: number;
  name: string;
  sex: 'm' | 'f';
  born: number;
  died: number;
  motherName: string | null;
  fatherName: string | null;
  slug: string;
}

const API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getPeople(): Promise<Person[]> {
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}
