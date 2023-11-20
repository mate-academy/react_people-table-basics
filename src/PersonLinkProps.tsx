import { Person } from './types';

export interface PersonLinkProps {
  person: Person;
  onSelect: (slug: string) => void;
}
