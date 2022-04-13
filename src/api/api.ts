const BASE_URL = 'https://mate-academy.github.io/react_people-table/api';

export const request = (url: string) => fetch(`${BASE_URL}${url}`);
