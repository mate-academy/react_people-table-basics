import { PersonFromServer } from './PersonFromServer';

export interface Person extends PersonFromServer {
  mother: PersonFromServer | undefined,
  father: PersonFromServer | undefined,
}
