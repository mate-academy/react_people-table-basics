export const getPeople = () => (
  fetch('https://mate-academy.github.io/react_people-table/api/people.json')
    .then((people) => {
      if (!people.ok) {
        throw new Error(`${people.status}-${people.statusText}`);
      }

      return people.json();
    })
);
