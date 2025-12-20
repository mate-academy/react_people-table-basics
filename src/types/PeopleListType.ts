import type { Person } from './Person';

export type PeopleListType = {
  peoplelist: Person[];
  loader: boolean;
  errortext: string;
};
