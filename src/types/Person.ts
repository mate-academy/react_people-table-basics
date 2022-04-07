export interface Person {
  name: string,
  sex: string,
  born: string,
  died: string,
  motherName: string,
  fatherName: string,
  id: number,
  mother: Person,
  father: Person,
}
