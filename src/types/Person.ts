export interface Person {
  mother: Person | null;
  father: Person | null;
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
}
