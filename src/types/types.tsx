export interface IPeople {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string,
  mother: {} | null,
  father: {} | null,
}
