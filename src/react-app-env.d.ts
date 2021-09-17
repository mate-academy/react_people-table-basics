// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Person {
  name: string;
  sex: Sex;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
}

enum Sex {
  male = 'm',
  female = 'f',
}
