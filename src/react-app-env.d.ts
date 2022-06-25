/// <reference types="react-scripts" />
type Person = {
  name: string;
  sex: 'm' | 'f';
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
  mother?: Person,
  father?: Person,
};
