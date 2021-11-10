import { People } from '../types/peopleType';

const PEOPLE_LINK = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeopleFromServer = (): Promise<People[]> => {
  return fetch(PEOPLE_LINK)
    .then(response => response.json());
};
