import { Person } from './Person';

export interface PreparedPerson extends Person{
  father: Person | undefined,
  mother: Person | undefined,
}
