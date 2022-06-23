// eslint-disable-next-line
/// <reference types="react-scripts" />
export interface Person {
  name: string,
  sex: string,
  born: number
  died: number,
  fatherName: string,
  motherName: string,
  slug: tring,
  mother?: Person,
  father?: Person
}
