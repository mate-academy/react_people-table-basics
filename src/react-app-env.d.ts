// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Person {
  name: string,
  sex: string,
  born: number,
  died: number,
  motherName: string | null,
  fatherName: string | null,
  slug: string,
}

interface PersonWithParents extends Person {
  father: Person | null,
  mother: Person | null,
}
