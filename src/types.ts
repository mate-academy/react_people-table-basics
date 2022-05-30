export interface Person {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
}

export interface PersonWithParents extends Person {
  mother?: Person,
  father?: Person,
}
