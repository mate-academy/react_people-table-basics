export interface Person {
  setFather(father: Person | undefined): void;
  setMother(mother: Person | undefined): void;
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
  mother?: Person;
  father?: Person;
}
