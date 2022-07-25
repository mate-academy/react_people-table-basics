interface Person {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: number,
  father: Person | null,
  mother: Person | null,
}
