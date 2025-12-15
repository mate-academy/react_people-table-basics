export interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
  mother?: Person;
  father?: Person;
}

export interface PersonLinkProps {
  person?: Person;
  name?: string;
  people: Person[];
}

export interface PeopleTableProps {
  people: Person[];
  selectedSlug?: string;
}
