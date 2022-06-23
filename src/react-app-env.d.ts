// eslint-disable-next-line
/// <reference types="react-scripts" />

interface People {
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  name: string,
  sex: string,
  slug: string,
  mother?: People,
  father?: People,
}
