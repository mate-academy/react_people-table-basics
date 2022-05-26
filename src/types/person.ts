export interface Person {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string | null,
  motherName: string | null,
  slug: string,
}

export interface FullPerson extends Person {
  father: Person | null,
  mother: Person | null
}
