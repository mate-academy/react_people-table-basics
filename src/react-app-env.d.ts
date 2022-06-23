// eslint-disable-next-line
/// <reference types="react-scripts" />

interface People {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
}

interface PeopleWithParrents extends People {
  father: People | null;
  mother: People | null;
}
