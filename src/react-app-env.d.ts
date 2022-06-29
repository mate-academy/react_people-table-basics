// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Person {
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  name: string,
  sex: string,
  slug: string,
}

interface PersonWithParents extends Person {
  mother: Person | null,
  father: Person | null,
}
