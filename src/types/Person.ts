import { PersonFromServer } from './PersonFromServer';

export interface Person {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string
  mother: PersonFromServer | undefined,
  father: PersonFromServer | undefined,
}
