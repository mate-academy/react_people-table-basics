export interface Person {
  name: string;
  sex: 'm' | 'f';
  born: number;
  died: number;
  motherName?: string;
  fatherName?: string;
  slug: string;
}
