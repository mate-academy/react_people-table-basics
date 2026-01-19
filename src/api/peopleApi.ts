export interface Person {
  slug: string;
  name: string;
  sex: 'm' | 'f';
  born: number;
  died: number;
  motherName?: string;
  fatherName?: string;
}

export const fetchPeople = async (): Promise<Person[]> => {
  const response = await fetch(
    'https://mate-academy.github.io/react_people-table/api/people.json',
  );

  if (!response.ok) {
    throw new Error('Failed to load people');
  }

  return response.json();
};
