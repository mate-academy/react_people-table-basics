export interface Person {
  name: string,
  sex: 'm' | 'f',
  born: number,
  died: number,
  fatherName: string | null,
  motherName: string | null,
  slug: string
}

export interface FullPerson extends Person {
  mother: Person | null,
  father: Person | null
}
