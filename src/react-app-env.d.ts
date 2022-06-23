// eslint-disable-next-line
/// <reference types="react-scripts" />

export type People = {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string,
};

export type PersonWithParents = {
  mother: string;
  father: string;
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string,
};
