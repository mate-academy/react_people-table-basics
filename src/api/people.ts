export const getPeople = async (): Promise<Human[]> => {
  const response = await fetch('https://mate-academy.github.io/react_people-table/api/people.json');

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  const humans = await response.json();

  return humans;
};
