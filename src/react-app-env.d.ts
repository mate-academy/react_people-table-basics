// eslint-disable-next-line
/// <reference types="react-scripts" />

enum Sex {
  m = 'm',
  f = 'f',
};

interface Person {
  name: string;
  sex: Sex;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
  mother: Person | null;
  father: Person | null;
}
