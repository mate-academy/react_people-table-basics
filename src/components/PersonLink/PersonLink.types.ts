import { Person } from '../../types';

export interface PersonLinkProps {
  people: Person[];
  person: Person;
  personSlug: string | undefined;
}
