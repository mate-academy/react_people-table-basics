import { Key } from 'react';

export interface Person {
  id: Key | null | undefined;
  name: string;
  sex: string;
  born: number;
  died?: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
  mother?: Person;
  father?: Person;
}
