// eslint-disable-next-line
/// <reference types="react-scripts" />
interface Person {
  name: string,
  sex: string,
  born: number,
  died: number,
  motherName: null | string,
  fatherName: null | string,
}

interface ProcessedPerson extends Person {
  father: null | Person,
  mother: null | Person,
}
