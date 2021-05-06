export type Person = {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  mother: Person | undefined;
  father: Person | undefined;
  slug: string;
};
