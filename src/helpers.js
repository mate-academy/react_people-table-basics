const url = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = () => (
  fetch(url)
    .then((result) => {
      return result.json();
    })
    .catch(() => {
      console.log('Error Message');
    })
);
