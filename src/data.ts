export const PEOPLE_API = `
  https://mate-academy.github.io/react_people-table/api/people.json
`;

export const getPeople = () => {
  return fetch(PEOPLE_API)
    .then((response) => response.json());
};
