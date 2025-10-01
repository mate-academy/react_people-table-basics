// src/api.ts
export const getPeople = async () => {
  const response = await fetch(
    'https://mate-academy.github.io/react_people-table/api/people.json',
  );

  if (!response.ok) {
    throw new Error('Failed to fetch people');
  }

  return response.json();
};
