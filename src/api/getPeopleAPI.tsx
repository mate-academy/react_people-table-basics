// eslint-disable-next-line max-len
const api = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeopleApi = (): Promise<Person[]> => {
  return fetch(api)
    .then(promise => promise.json());
};
