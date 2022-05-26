export interface Person {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string
}

export interface PersonWithParents extends Person {
  father?: Person,
  mother?: Person,
}
