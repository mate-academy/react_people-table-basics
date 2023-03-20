import { Person } from './Person';

export interface PersonWithParents {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName?: string,
  motherName?: string,
  slug: string,
  mother?: Person,
  father?: Person,
}
