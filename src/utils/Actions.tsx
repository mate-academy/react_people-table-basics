export const getPeople = () => {
  return fetch(
    'https://mate-academy.github.io/react_people-table/api/people.json',
  )
    .then(response => {
      return response.json();
    })
    .catch(() => {
      throw new Error('Error ');
    });
};
