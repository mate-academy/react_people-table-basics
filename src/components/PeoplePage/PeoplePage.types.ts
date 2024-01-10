import { Person } from '../../types';

export interface PeopleListProps {
  people: Person[],
  selectedPersonSlug: string,
}
export interface ParentProps {
  parentName: string | null,
  people: Person[],
}

export interface PersonLinkProps {
  person: Person,
}

export interface PersonInfoProps {
  person: Person,
  selectedPersonSlug: string,
}
