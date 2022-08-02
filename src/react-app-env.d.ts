// eslint-disable-next-line
/// <reference types="react-scripts" />
interface People {
  name: string;
  sex: 'm' | 'f';
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  mother: Person | null;
  father: Person | null;
}
