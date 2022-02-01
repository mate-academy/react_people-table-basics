export interface Human {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  mother: Human | undefined,
  father: Human | undefined,
}
