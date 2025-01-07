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

export enum PersonSex {
  Female = 'f',
  Male = 'm',
}

export const personFields = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const emptyPerson = '-';
