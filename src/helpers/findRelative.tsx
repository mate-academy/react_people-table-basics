import { Person, Gender } from '../types';

export const findRelative = (gender: string, user: Person, users: Person[]) => {
  const targetGender = gender === Gender.MALE ? Gender.MALE : Gender.FEMALE;
  const targetName = gender === Gender.MALE ? user.fatherName : user.motherName;

  return users
    .find(oneUser => oneUser.sex === targetGender
      && oneUser.name === targetName);
};
