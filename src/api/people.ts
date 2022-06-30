const API = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = (): Promise<Person[]> => {
  return fetch(API)
    .then(response => {
      if (!response.ok) {
        throw new Error('Something got wrong');
      }

      return response.json();
    });
};
