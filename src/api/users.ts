export const users = async () => {
  const response = await fetch('https://mate-academy.github.io/react_people-table/api/people.json');

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};
