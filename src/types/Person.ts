export type Person = {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: Person | string,
  motherName: Person | string,
  slug: string
};
