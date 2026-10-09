export interface Person {
  slug: string;
  name: string;
  sex: string;
  born: number;
  died: number | null;
  motherName: string | null;
  fatherName: string | null;
}
