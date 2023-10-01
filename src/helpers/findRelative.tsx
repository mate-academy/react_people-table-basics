import { Person } from '../types';

export const findRelative = (gender: string, user: Person, users: Person[]) => {
  if (gender === 'm') {
    return users.filter(oneUser => oneUser.sex === 'm')
      .find(oneUser => oneUser.name === user.fatherName);
  }

  if (gender === 'f') {
    return users.filter(oneUser => oneUser.sex === 'f')
      .find(oneUser => oneUser.name === user.motherName);
  }

  return undefined;
};
