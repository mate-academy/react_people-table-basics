import { Person } from '../../types/Person';

const wait = (delay: number): Promise<typeof delay> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(delay), delay);
  });
};

export const getPeople = async (): Promise<Person[]> => {
  await wait(1000);

  const response = await fetch(
    'https://mate-academy.github.io/react_people-table/api/people.json',
  );

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response.json();
};
