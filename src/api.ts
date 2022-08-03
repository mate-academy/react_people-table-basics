// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async (): Promise<Person[] | ResponseError> => {
  return fetch(API_URL)
    .then(resp => resp.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
};
