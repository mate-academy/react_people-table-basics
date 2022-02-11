// eslint-disable-next-line
/// <reference types="react-scripts" />

type PersonFromServer = {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string,
};

type Person = {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string,
  mother: PersonFromServer | null,
  father: PersonFromServer | null,
};
