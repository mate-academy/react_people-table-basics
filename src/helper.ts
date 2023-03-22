import { Person } from './types';
import { Parents } from './types/Parents';

type FindParentFunction = (
  peoples: Person[],
  person: Person,
  parent: Parents
) => Person | undefined;

export const findParent: FindParentFunction = (peoples, person, parent) => {
  const { fatherName, motherName } = person;

  switch (parent) {
    case Parents.Mother:
      return peoples.find(({ name }) => name === motherName);

    case Parents.Father:
      return peoples.find(({ name }) => name === fatherName);
    default:
      return undefined;
  }
};
