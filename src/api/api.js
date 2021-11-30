const BASE_URL = 'https://mate-academy.github.io/react_people-table/api';

const request = async(endpoint = '') => {
  try {
    const result = await fetch(`${BASE_URL}${endpoint}`);

    return result.json();
  } catch (error) {
    throw new Error(`${error.code} - ${error.message}`);
  }
};

export const getPeople = () => request('/people.json');
