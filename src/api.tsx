// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async () => {
  try {
    const response = await fetch(BASE_URL);

    return await response.json();
  } catch (error) {
    throw new Error(`${error}`);
  }
};
