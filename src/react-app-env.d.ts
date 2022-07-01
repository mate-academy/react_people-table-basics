// eslint-disable-next-line
/// <reference types="react-scripts" />

export interface Person {
  slug: string;
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;

  father?: Person;
  mother?: Person;
}
