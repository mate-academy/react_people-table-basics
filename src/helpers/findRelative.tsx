import { Person } from '../types';
import { MAN_MALE } from '../constants/MAN_MALE';
import { WOMEN_MALE } from '../constants/WOMEN_MALE';

export const findRelative = (gender: string, user: Person, users: Person[]) => {
  if (gender === MAN_MALE) {
    return users.filter(oneUser => oneUser.sex === MAN_MALE)
      .find(oneUser => oneUser.name === user.fatherName);
  }

  if (gender === WOMEN_MALE) {
    return users.filter(oneUser => oneUser.sex === WOMEN_MALE)
      .find(oneUser => oneUser.name === user.motherName);
  }

  return undefined;
};
