export interface Person {
  name: string,
  sex: string,
  born: number,
  died: number,
  motherName: string | null,
  fatherName: string | null,
  slug: string,
  mother?: Person,
  father?: Person,
}
