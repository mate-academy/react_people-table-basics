// import  { IPeople } from '../types/types';

// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const request = () => fetch(API_URL).then(res => res.json());

export const getPeople = () => request();
