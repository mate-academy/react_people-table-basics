const BASE_API = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async () => {
  return fetch(BASE_API)
    .then(response => {
      if (!response.ok) {
        throw new Error('Can not fetch data')
      }

      return response.json();
    })
}