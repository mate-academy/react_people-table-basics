import { getPeople } from '../utils/api';

export const client = {
  load: async () => {
    try {
      const people = await getPeople();

      return people;
    } catch (e) {
      throw e;
    }
  },
};
