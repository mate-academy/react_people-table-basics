export interface Person {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string | null,
  motherName: string,
  slug: string,
  mother?: Person,
  father?: Person,
}
