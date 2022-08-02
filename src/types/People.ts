export interface People {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string,
  father?: People | null,
  mother?: People | null,
}
