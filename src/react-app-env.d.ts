// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Person {
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  name: string;
  sex: string;
}

interface PersonWithParents {
  born: number;
  died: number;
  father: Person;
  mother: Person;
  name: string;
  sex: string;
}
