const API = "https://mate-academy.github.io/react_people-table/api/people.json";

export const getPeople = () => {
  const people = fetch(API)
    .then(promise => promise.json())
    .then(result => result);

  return people;
}