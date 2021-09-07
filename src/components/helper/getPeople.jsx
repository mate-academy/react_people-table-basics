export const getPeople = () => (
  fetch('https://mate-academy.github.io/react_people-table/api/people.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error`);
      }

      return response.json();
    })
);
