const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async () => {
  const result = await fetch(`${URL}`)
    .then(response => response.json());

  return result;
};
