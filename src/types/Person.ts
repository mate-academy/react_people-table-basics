export interface Person {
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

export type ExtendedPerson = Person & {
  motherObject: Person | null;
  fatherObject: Person | null;
};
