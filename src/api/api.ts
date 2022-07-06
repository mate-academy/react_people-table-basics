const BASE_URL
  = 'https://mate-academy.github.io/react_people-table/api/people.json';

const request = () => {
  return fetch(BASE_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

export const getPeople = ():Promise<Person[]> => {
  return request();
};
