import { Data } from './types/types';

export const preparedData = <T extends Data>(data: T[]): T[] => {
  return data.map(item => {
    const mother = data.find(el => el.name === item.motherName);
    const father = data.find(el => el.name === item.fatherName);

    const obj = {
      ...item,
      ...(mother && { mother }),
      ...(father && { father }),
    };

    return obj;
  });
};
