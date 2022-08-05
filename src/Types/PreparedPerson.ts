import { Person } from './Person';

export interface PreparedPerson extends Person{
  father: Person | null,
  mother: Person | null,
}
