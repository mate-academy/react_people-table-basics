// eslint-disable-next-line
/// <reference types="react-scripts" />

interface People {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  mother: People | null;
  father: People | null;
  slug: string;
}
