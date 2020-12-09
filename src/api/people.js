import { request } from './helpers';

export const getPeople = async() => {
  const people = await request();

  return people;
};
