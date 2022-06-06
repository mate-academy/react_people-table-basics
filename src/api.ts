const BASE_URL = 'https://mate-academy.github.io/react_people-table/api';

export const getPeople = async () => {
  try {
    const response = await fetch(`${BASE_URL}/people.json`);

    if (response.ok) {
      return response;
    }

    throw new Error('error');
  } catch {
    throw new Error('error');
  }
};
