// eslint-disable-next-line
/// <reference types="react-scripts" />

export interface Person {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string,
}

export interface NewPerson extends Person {
  mother: Person | null,
  father: Person | null,
}
