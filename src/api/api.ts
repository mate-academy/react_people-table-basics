import { Person } from '../types/Person';

const BASE_URL = `https://mate-academy.github.io/react_people-table
/api/people.json`;

export const getPeoplesList = (setPeople: (data: Person[]) => void) => {
  fetch(BASE_URL)
    .then(resp => resp.json())
    .then(data => setPeople(data));
};
