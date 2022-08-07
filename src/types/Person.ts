import { PersonFromServer } from './PersonFromServer';

export interface Person extends PersonFromServer {
  mother: PersonFromServer | null,
  father: PersonFromServer | null,
}
